import { useState, useEffect } from "react";
import { Search, ShieldCheck, Loader2, Image as ImageIcon, Link2, Layers, Upload, X, Save, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { VerdictBadge } from "@/components/rasad/Badge";
import { ConfidenceRing } from "@/components/rasad/ConfidenceRing";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import type { Verification, Collection } from "@/components/dashboard/types";

const exportCsv = (rows: Verification[]) => {
  const header = ["id", "kind", "verdict", "confidence", "input_text", "input_url", "created_at"];
  const escape = (s: unknown) => `"${String(s ?? "").replace(/"/g, '""')}"`;
  const csv = [header.join(","), ...rows.map((r) => header.map((k) => escape((r as any)[k])).join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `rasad-verifications-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
};

export default function Verify() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"text" | "url" | "image" | "batch">("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [batch, setBatch] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [latest, setLatest] = useState<Verification | null>(null);
  const [history, setHistory] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveTarget, setSaveTarget] = useState<Verification | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [chosenCol, setChosenCol] = useState<string>("");

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("verifications").select("*").eq("user_id", user.id)
      .order("created_at", { ascending: false }).limit(50);
    setHistory((data ?? []) as unknown as Verification[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, [user]);

  useEffect(() => {
    if (!user) return;
    supabase.from("collections").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setCollections((data ?? []) as Collection[]));
  }, [user]);

  const onImage = (f: File | null) => {
    setImgFile(f);
    if (imgPreview) URL.revokeObjectURL(imgPreview);
    setImgPreview(f ? URL.createObjectURL(f) : null);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imgFile || !user) return null;
    const path = `${user.id}/${Date.now()}-${imgFile.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error } = await supabase.storage.from("avatars").upload(path, imgFile, { upsert: true });
    if (error) { toast.error("فشل رفع الصورة"); return null; }
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    return pub.publicUrl;
  };

  const run = async () => {
    if (analyzing) return;
    let body: Record<string, unknown> = {};
    if (tab === "text") {
      const t = text.trim();
      if (!t) { toast.error("أدخل ادعاءً"); return; }
      body = { input: t, kind: "text" };
    } else if (tab === "url") {
      const u = url.trim();
      if (!/^https?:\/\//i.test(u)) { toast.error("أدخل رابطًا صالحًا"); return; }
      body = { input: u, kind: "url" };
    } else if (tab === "image") {
      if (!imgFile) { toast.error("اختر صورة"); return; }
      setAnalyzing(true);
      const imageUrl = await uploadImage();
      if (!imageUrl) { setAnalyzing(false); return; }
      body = { kind: "image", image_url: imageUrl, input: text.trim() };
    } else if (tab === "batch") {
      const items = batch.split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 10);
      if (items.length === 0) { toast.error("أدخل ادعاءات (سطر لكل ادعاء)"); return; }
      setAnalyzing(true);
      const { data, error } = await supabase.functions.invoke("verify-batch", { body: { items } });
      setAnalyzing(false);
      if (error) { toast.error("فشل التحقق الجماعي"); return; }
      toast.success(`تم تحقق ${data?.results?.length ?? 0} عنصر`);
      setBatch("");
      load();
      return;
    }

    setAnalyzing(true);
    setLatest(null);
    const { data, error } = await supabase.functions.invoke("verify-claim", { body });
    setAnalyzing(false);
    if (error) { toast.error("فشل التحقق"); return; }
    if (data?.error) { toast.error(data.error); return; }
    const v = data?.verification as Verification;
    setLatest(v);
    setHistory((p) => [v, ...p]);
    setText(""); setUrl(""); onImage(null);
    toast.success("اكتمل التحقق");
  };

  const saveToCollection = async () => {
    if (!saveTarget || !chosenCol) return;
    const { error } = await supabase.from("collection_items").insert({
      collection_id: chosenCol, verification_id: saveTarget.id,
    });
    if (error) {
      if (error.code === "23505") toast.error("موجود مسبقًا في هذه المجموعة");
      else toast.error("تعذّر الحفظ");
    } else {
      toast.success("تم الحفظ");
      setSaveTarget(null); setChosenCol("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">تحقّق جديد</h1>
        <p className="mt-1 text-sm text-muted-foreground">حلّل نصًا، رابطًا، صورة، أو دفعة من الادعاءات</p>
      </div>

      <Card className="border-border/50 p-5 sm:p-6">
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="text" className="gap-1.5"><Search className="h-3.5 w-3.5" /><span className="hidden sm:inline">نص</span></TabsTrigger>
            <TabsTrigger value="url" className="gap-1.5"><Link2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">رابط</span></TabsTrigger>
            <TabsTrigger value="image" className="gap-1.5"><ImageIcon className="h-3.5 w-3.5" /><span className="hidden sm:inline">صورة</span></TabsTrigger>
            <TabsTrigger value="batch" className="gap-1.5"><Layers className="h-3.5 w-3.5" /><span className="hidden sm:inline">دفعة</span></TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-4">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب الادعاء المراد التحقق منه..." rows={3} maxLength={2000} disabled={analyzing} />
          </TabsContent>
          <TabsContent value="url" className="mt-4">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." disabled={analyzing} dir="ltr" />
          </TabsContent>
          <TabsContent value="image" className="mt-4 space-y-3">
            {imgPreview ? (
              <div className="relative inline-block">
                <img src={imgPreview} alt="preview" className="max-h-64 rounded-lg border border-border/50" />
                <Button size="icon" variant="destructive" className="absolute top-2 end-2 h-7 w-7" onClick={() => onImage(null)}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/50 bg-card/40 p-8 hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm">اضغط لاختيار صورة (JPG/PNG حتى 10MB)</span>
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]; if (!f) return;
                    if (f.size > 10 * 1024 * 1024) { toast.error("الحد 10MB"); return; }
                    onImage(f);
                  }} />
              </label>
            )}
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="سياق اختياري للصورة..." disabled={analyzing} />
          </TabsContent>
          <TabsContent value="batch" className="mt-4">
            <Textarea value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="ادعاء في كل سطر — حد أقصى 10 ادعاءات" rows={6} disabled={analyzing} />
            <p className="mt-1 text-[11px] text-muted-foreground">{batch.split("\n").filter((s) => s.trim()).length}/10</p>
          </TabsContent>

          <Button onClick={run} disabled={analyzing} className="mt-4 w-full sm:w-auto gap-2">
            {analyzing ? <><Loader2 className="h-4 w-4 animate-spin" /> جارٍ التحليل...</> : <><ShieldCheck className="h-4 w-4" /> تحقّق الآن</>}
          </Button>
        </Tabs>

        {latest && !analyzing && (
          <div className="mt-6 flex flex-col items-start gap-6 rounded-xl border border-border/50 bg-background/40 p-5 sm:flex-row">
            <ConfidenceRing value={latest.confidence} size={84} label="ثقة" />
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <VerdictBadge verdict={latest.verdict === "uncertain" ? "suspicious" : latest.verdict} />
                <span className="mono text-xs text-muted-foreground">CONF {latest.confidence}%</span>
                <Button size="sm" variant="ghost" className="ms-auto gap-1" onClick={() => setSaveTarget(latest)}>
                  <Save className="h-3.5 w-3.5" /> حفظ
                </Button>
              </div>
              <p className="text-sm font-semibold">{latest.input_text}</p>
              {latest.image_url && <img src={latest.image_url} alt="" className="mt-3 max-h-40 rounded-md border border-border/50" />}
              {latest.explanation && <p className="mt-3 text-sm leading-7 text-muted-foreground">{latest.explanation}</p>}
              {latest.sources?.length > 0 && (
                <div className="mt-4 border-t border-border/50 pt-3">
                  <div className="mb-2 mono text-[11px] tracking-widest text-muted-foreground">المصادر</div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {latest.sources.map((s, i) => <li key={i}>• {s.title}{s.note ? ` — ${s.note}` : ""}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* History */}
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold">السجل ({history.length})</h2>
          {history.length > 0 && (
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => exportCsv(history)}>
              <Download className="h-3.5 w-3.5" /> CSV
            </Button>
          )}
        </div>
        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
        ) : history.length === 0 ? (
          <Card className="border-dashed border-border/50 bg-transparent p-10 text-center text-sm text-muted-foreground">لا يوجد سجل بعد</Card>
        ) : (
          <div className="space-y-3">
            {history.map((h) => (
              <Card key={h.id} className="border-border/50 p-4">
                <div className="flex items-start gap-4">
                  <ConfidenceRing value={h.confidence} size={56} />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <VerdictBadge verdict={h.verdict === "uncertain" ? "suspicious" : h.verdict} />
                      <span className="mono text-[11px] text-muted-foreground">{h.kind?.toUpperCase()}</span>
                      <span className="mono text-[11px] text-muted-foreground">
                        {formatDistanceToNow(new Date(h.created_at), { addSuffix: true, locale: ar })}
                      </span>
                      <Button size="sm" variant="ghost" className="ms-auto h-7 gap-1 text-xs" onClick={() => setSaveTarget(h)}>
                        <Save className="h-3 w-3" /> حفظ
                      </Button>
                    </div>
                    <p className="line-clamp-2 text-sm">{h.input_text}</p>
                    {h.explanation && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{h.explanation}</p>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!saveTarget} onOpenChange={(o) => !o && setSaveTarget(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>حفظ في مجموعة</DialogTitle></DialogHeader>
          {collections.length === 0 ? (
            <p className="text-sm text-muted-foreground">أنشئ مجموعة أولًا من صفحة "المجموعات".</p>
          ) : (
            <Select value={chosenCol} onValueChange={setChosenCol}>
              <SelectTrigger><SelectValue placeholder="اختر مجموعة" /></SelectTrigger>
              <SelectContent>
                {collections.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          <DialogFooter>
            <Button onClick={saveToCollection} disabled={!chosenCol}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
