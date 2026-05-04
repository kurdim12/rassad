import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  LogOut, Search, Sparkles, ShieldCheck, AlertTriangle, FileSearch,
  Activity, Settings, Inbox, Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Logo } from "@/components/rasad/Logo";
import { VerdictBadge } from "@/components/rasad/Badge";
import { ConfidenceRing } from "@/components/rasad/ConfidenceRing";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

type Profile = { full_name: string | null; avatar_url: string | null };
type Verification = {
  id: string;
  input_text: string;
  input_url: string | null;
  verdict: "trusted" | "suspicious" | "fake" | "uncertain";
  confidence: number;
  explanation: string | null;
  sources: { title: string; note?: string }[];
  created_at: string;
};

const ONBOARD_KEY = "rasad_onboarded_v1";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showOnboard, setShowOnboard] = useState(false);
  const [query, setQuery] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [latest, setLatest] = useState<Verification | null>(null);
  const [history, setHistory] = useState<Verification[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const loadHistory = async () => {
    if (!user) return;
    setLoadingHistory(true);
    const { data } = await supabase
      .from("verifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);
    setHistory((data ?? []) as unknown as Verification[]);
    setLoadingHistory(false);
  };

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setProfile(data ?? { full_name: null, avatar_url: null });
        setLoadingProfile(false);
      });

    loadHistory();

    if (!localStorage.getItem(ONBOARD_KEY)) setShowOnboard(true);
  }, [user]);

  const finishOnboarding = () => {
    localStorage.setItem(ONBOARD_KEY, "1");
    setShowOnboard(false);
  };

  const runVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const input = query.trim();
    if (!input) { toast.error("أدخل ادعاءً أو رابطًا للتحقق"); return; }
    if (input.length > 2000) { toast.error("النص طويل جدًا (الحد 2000 حرف)"); return; }

    setAnalyzing(true);
    setLatest(null);

    const { data, error } = await supabase.functions.invoke("verify-claim", { body: { input } });
    setAnalyzing(false);

    if (error) {
      const msg = (error as any)?.context?.status === 429
        ? "تم تجاوز حدّ الطلبات. حاول بعد دقيقة."
        : (error as any)?.context?.status === 402
        ? "نفدت أرصدة الذكاء الاصطناعي."
        : "تعذّر التحقق. حاول مجددًا.";
      toast.error(msg);
      return;
    }
    if (data?.error) { toast.error(data.error); return; }

    const v = data?.verification as Verification | undefined;
    if (!v) { toast.error("لم تُرجَع نتيجة"); return; }

    setLatest(v);
    setHistory((prev) => [v, ...prev]);
    setQuery("");
    toast.success("اكتمل التحقق");
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "مستخدم";

  const stats = {
    total: history.length,
    fake: history.filter((h) => h.verdict === "fake").length,
    trusted: history.filter((h) => h.verdict === "trusted").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>لوحة التحقق | رصد</title></Helmet>

      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" aria-label="لوحة رصد"><Logo /></Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/"><Settings className="h-4 w-4" /><span className="hidden sm:inline">الموقع</span></Link></Button>
            <Button variant="ghost" size="sm" onClick={() => { signOut(); toast.success("تم تسجيل الخروج"); }} className="gap-1.5">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">خروج</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          {loadingProfile ? <Skeleton className="h-8 w-64" /> : <h1 className="text-2xl font-bold sm:text-3xl">أهلًا، {displayName}</h1>}
          <p className="mt-1 text-sm text-muted-foreground">ابدأ عملية تحقق جديدة أو راجع نشاطك</p>
        </div>

        {/* Quick verify */}
        <Card className="mb-8 border-white/[0.08] bg-gradient-to-b from-card to-card/60 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            تحقق مدعوم بالذكاء الاصطناعي
          </div>
          <form onSubmit={runVerify} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="ألصق رابط خبر أو اكتب ادعاءً للتحقق..."
                className="ps-10 h-12 text-base" maxLength={2000} disabled={analyzing} />
            </div>
            <Button type="submit" disabled={analyzing} className="h-12 gap-2 sm:px-8">
              {analyzing
                ? <><Loader2 className="h-4 w-4 animate-spin" />جارٍ التحليل...</>
                : <><ShieldCheck className="h-4 w-4" />تحقق الآن</>}
            </Button>
          </form>

          {analyzing && (
            <div className="mt-6 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          )}

          {latest && !analyzing && (
            <div className="mt-6 flex flex-col items-start gap-6 rounded-xl border border-white/[0.06] bg-background/50 p-5 sm:flex-row">
              <ConfidenceRing value={latest.confidence} size={84} label="ثقة" />
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <VerdictBadge verdict={latest.verdict === "uncertain" ? "suspicious" : latest.verdict} />
                  <span className="mono text-xs text-muted-foreground">CONF {latest.confidence}%</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{latest.input_text}</p>
                {latest.explanation && (
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{latest.explanation}</p>
                )}
                {latest.sources?.length > 0 && (
                  <div className="mt-4 border-t border-white/[0.06] pt-3">
                    <div className="mb-2 mono text-[11px] tracking-widest text-muted-foreground">SOURCES</div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {latest.sources.map((s, i) => (
                        <li key={i}>• {s.title}{s.note ? ` — ${s.note}` : ""}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "عمليات التحقق", value: stats.total, icon: ShieldCheck },
            { label: "نتائج موثوقة", value: stats.trusted, icon: ShieldCheck },
            { label: "محتوى مزيّف", value: stats.fake, icon: AlertTriangle },
          ].map((s) => (
            <Card key={s.label} className="border-white/[0.06] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 display text-3xl">{s.value}</div>
            </Card>
          ))}
        </div>

        {/* History */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">سجلّ التحقق</h2>
          {history.length > 0 && (
            <span className="mono text-[11px] text-muted-foreground">{history.length} عملية</span>
          )}
        </div>

        {loadingHistory ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
          </div>
        ) : history.length === 0 ? (
          <Card className="border-dashed border-white/[0.08] bg-transparent p-10 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-white/[0.08] bg-card">
              <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">لا يوجد نشاط بعد</h3>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">عمليات التحقق التي تنشئها ستظهر هنا.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {history.map((h) => (
              <Card key={h.id} className="border-white/[0.06] p-4">
                <div className="flex items-start gap-4">
                  <ConfidenceRing value={h.confidence} size={56} />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <VerdictBadge verdict={h.verdict === "uncertain" ? "suspicious" : h.verdict} />
                      <span className="mono text-[11px] text-muted-foreground">
                        {formatDistanceToNow(new Date(h.created_at), { addSuffix: true, locale: ar })}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm">{h.input_text}</p>
                    {h.explanation && <p className="mt-1 line-clamp-2 text-xs leading-6 text-muted-foreground">{h.explanation}</p>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Onboarding modal */}
      <Dialog open={showOnboard} onOpenChange={(o) => !o && finishOnboarding()}>
        <DialogContent className="max-w-md text-start">
          <DialogHeader>
            <DialogTitle className="text-xl">مرحبًا بك في رصد</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              منصة التحقق الرقمي للمحتوى العربي، مدعومة بالذكاء الاصطناعي.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3 py-2">
            {[
              { icon: Search, text: "ألصق رابطًا أو ادعاءً للتحقق منه" },
              { icon: ShieldCheck, text: "احصل على نتيجة فورية بنسبة ثقة وتفسير" },
              { icon: FileSearch, text: "كل عملياتك تُحفظ في سجل خاص بك" },
            ].map((it, i) => (
              <li key={i} className="flex items-start gap-3 rounded-md border border-white/[0.06] bg-background/40 p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                  <it.icon className="h-4 w-4" />
                </div>
                <span className="text-sm">{it.text}</span>
              </li>
            ))}
          </ul>
          <DialogFooter>
            <Button onClick={finishOnboarding} className="w-full">ابدأ الآن</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
