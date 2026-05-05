import { useEffect, useState } from "react";
import { Search, ShieldCheck, Loader2, Image as ImageIcon, Link2, Upload, X, Download, Copy, FileJson, Sparkles, LogIn } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { VerdictBadge } from "@/components/rasad/Badge";
import { ConfidenceRing } from "@/components/rasad/ConfidenceRing";
import { WebSourcesPanel } from "@/components/rasad/WebSourcesPanel";
import { AgentBreakdownPanel } from "@/components/rasad/AgentBreakdownPanel";
import { HistoryDrawer } from "@/components/rasad/HistoryDrawer";
import { addToHistory, clearHistory, getHistory, type GuestVerification } from "@/lib/local-history";
import { exportAsCSV, exportAsJSON, copyShareableText } from "@/lib/export-verdict";

type Tab = "text" | "url" | "image";
type Verdict = GuestVerification;

const STATUS_STEPS = [
  "جارٍ تحليل اللغة العربية...",
  "جارٍ التحقق من أصالة الوسائط...",
  "جارٍ البحث في المصادر الموثوقة...",
  "جارٍ كشف الأخبار المزيفة...",
  "جارٍ تتبع المصدر الأصلي...",
  "جارٍ اتخاذ الحكم النهائي...",
];

const normalizeVerdict = (v: string): "trusted" | "suspicious" | "fake" => {
  const k = v.toLowerCase();
  if (["trusted", "verified", "true"].includes(k)) return "trusted";
  if (["fake", "false", "misleading"].includes(k)) return "fake";
  return "suspicious";
};

export const PublicVerify = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const [result, setResult] = useState<Verdict | null>(null);
  const [history, setHistory] = useState<GuestVerification[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Cycle status messages while running
  useEffect(() => {
    if (!running) return;
    setStatusIdx(0);
    const id = setInterval(() => {
      setStatusIdx((i) => Math.min(i + 1, STATUS_STEPS.length - 1));
    }, 1400);
    return () => clearInterval(id);
  }, [running]);

  const onImage = (f: File | null) => {
    setImgFile(f);
    if (imgPreview) URL.revokeObjectURL(imgPreview);
    setImgPreview(f ? URL.createObjectURL(f) : null);
  };

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });

  const run = async () => {
    if (running) return;
    let body: Record<string, unknown> = {};

    if (tab === "text") {
      const t = text.trim();
      if (!t) return toast.error("أدخل ادعاءً للتحقق");
      if (t.length > 2000) return toast.error("الحد الأقصى 2000 حرف");
      body = { input: t, kind: "text" };
    } else if (tab === "url") {
      const u = url.trim();
      if (!/^https?:\/\//i.test(u)) return toast.error("أدخل رابطًا صالحًا (https://...)");
      body = { input: u, kind: "url" };
    } else {
      if (!imgFile) return toast.error("اختر صورة للتحليل");
      try {
        const dataUrl = await fileToDataUrl(imgFile);
        body = { kind: "image", image_url: dataUrl, input: text.trim() };
      } catch {
        return toast.error("تعذّر قراءة الصورة");
      }
    }

    setRunning(true);
    setResult(null);
    const { data, error } = await supabase.functions.invoke("verify-claim", { body });
    setRunning(false);

    if (error) {
      toast.error("فشل التحقق — حاول لاحقاً");
      return;
    }
    if (data?.error) {
      toast.error(String(data.error));
      return;
    }

    const v = data?.verification as Verdict | undefined;
    if (!v) return toast.error("لم نتلقَّ نتيجة صالحة");

    setResult(v);
    const next = addToHistory(v);
    setHistory(next);
    toast.success("اكتمل التحقق");
    // reset inputs
    if (tab === "text") setText("");
    if (tab === "url") setUrl("");
    if (tab === "image") onImage(null);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    toast.success("تم مسح السجل المحلي");
  };

  const onSelectHistory = (v: GuestVerification) => setResult(v);

  const handleCopy = async () => {
    if (!result) return;
    await copyShareableText(result);
    toast.success("نُسخ الملخص إلى الحافظة");
  };

  return (
    <Card className="w-full border-border/60 p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="mono text-[11px] uppercase tracking-widest text-primary">RASAD VERIFY</span>
        </div>
        <HistoryDrawer history={history} onClear={handleClearHistory} onSelect={onSelectHistory} />
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="text" className="gap-1.5">
            <Search className="h-3.5 w-3.5" /> نص
          </TabsTrigger>
          <TabsTrigger value="url" className="gap-1.5">
            <Link2 className="h-3.5 w-3.5" /> رابط
          </TabsTrigger>
          <TabsTrigger value="image" className="gap-1.5">
            <ImageIcon className="h-3.5 w-3.5" /> صورة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="أدخل النص أو الادعاء المراد التحقق منه..."
            rows={4}
            maxLength={2000}
            disabled={running}
          />
          <p className="mt-1 mono text-[10px] text-muted-foreground">{text.length}/2000</p>
        </TabsContent>

        <TabsContent value="url" className="mt-4">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article"
            disabled={running}
            dir="ltr"
          />
        </TabsContent>

        <TabsContent value="image" className="mt-4 space-y-3">
          {imgPreview ? (
            <div className="relative inline-block">
              <img src={imgPreview} alt="معاينة" className="max-h-64 rounded-lg border border-border/50" />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 end-2 h-7 w-7"
                onClick={() => onImage(null)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/50 bg-card/40 p-8 hover:border-primary/50">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm">اضغط لاختيار صورة (JPG/PNG حتى 5MB)</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  if (f.size > 5 * 1024 * 1024) return toast.error("الحد 5MB");
                  onImage(f);
                }}
              />
            </label>
          )}
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="سياق اختياري للصورة..."
            disabled={running}
          />
        </TabsContent>

        <Button onClick={run} disabled={running} className="mt-5 w-full gap-2 sm:w-auto" size="lg">
          {running ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {STATUS_STEPS[statusIdx]}
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" /> تحقّق الآن
            </>
          )}
        </Button>
      </Tabs>

      {!user && (
        <p className="mt-3 text-[11px] text-muted-foreground">
          تستخدم رصد كزائر — السجل يُحفظ على هذا المتصفح فقط.{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            <LogIn className="me-1 inline h-3 w-3" />
            أنشئ حساباً مجانياً
          </Link>{" "}
          للحفظ السحابي والمجموعات والتنبيهات.
        </p>
      )}

      {result && !running && (
        <div className="mt-6 space-y-4">
          {/* Verdict header */}
          <div className="flex flex-col items-start gap-5 rounded-xl border border-border/60 bg-background/40 p-5 sm:flex-row">
            <ConfidenceRing value={result.confidence} size={92} label="الثقة" />
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <VerdictBadge verdict={normalizeVerdict(result.verdict)} />
                <span className="mono text-xs text-muted-foreground">CONF {result.confidence}%</span>
                <span className="mono text-[10px] text-muted-foreground">
                  {result.kind?.toUpperCase()} · {result.model ?? "RASAD AI"}
                </span>
              </div>
              <p className="text-sm font-semibold leading-7">{result.input_text || result.input_url}</p>
              {result.image_url && (
                <img
                  src={result.image_url}
                  alt=""
                  className="mt-3 max-h-40 rounded-md border border-border/50"
                />
              )}
              {result.explanation && (
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{result.explanation}</p>
              )}
            </div>
          </div>

          {/* Agent breakdown */}
          <AgentBreakdownPanel
            verdict={result.verdict}
            confidence={result.confidence}
            explanation={result.explanation}
          />

          {/* Sources */}
          <WebSourcesPanel sources={result.sources ?? []} />

          {/* Export bar */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => exportAsJSON(result)}>
              <FileJson className="h-3.5 w-3.5" /> JSON
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => exportAsCSV(result)}>
              <Download className="h-3.5 w-3.5" /> CSV
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={handleCopy}>
              <Copy className="h-3.5 w-3.5" /> نسخ الملخص
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
