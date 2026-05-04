import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LogOut, Search, Sparkles, ShieldCheck, AlertTriangle, FileSearch, Activity, Settings, Inbox } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Logo } from "@/components/rasad/Logo";
import { VerdictBadge } from "@/components/rasad/Badge";
import { ConfidenceRing } from "@/components/rasad/ConfidenceRing";
import { toast } from "sonner";

type Profile = { full_name: string | null; avatar_url: string | null };

const ONBOARD_KEY = "rasad_onboarded_v1";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showOnboard, setShowOnboard] = useState(false);
  const [query, setQuery] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { verdict: "trusted" | "fake" | "suspicious"; confidence: number; claim: string }>(null);

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

    if (!localStorage.getItem(ONBOARD_KEY)) setShowOnboard(true);
  }, [user]);

  const finishOnboarding = () => {
    localStorage.setItem(ONBOARD_KEY, "1");
    setShowOnboard(false);
  };

  const runDemo = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) { toast.error("أدخل ادعاءً أو رابطًا للتحقق"); return; }
    setAnalyzing(true);
    setResult(null);
    // Demo simulation
    await new Promise((r) => setTimeout(r, 1400));
    const verdicts = ["trusted", "fake", "suspicious"] as const;
    const v = verdicts[Math.floor(Math.random() * verdicts.length)];
    const c = v === "trusted" ? 88 + Math.floor(Math.random() * 10) : v === "fake" ? 82 + Math.floor(Math.random() * 12) : 50 + Math.floor(Math.random() * 25);
    setResult({ verdict: v, confidence: c, claim: query });
    setAnalyzing(false);
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "مستخدم";

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>لوحة التحقق | رصد</title></Helmet>

      {/* App Top Bar */}
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
        {/* Welcome */}
        <div className="mb-8">
          {loadingProfile ? (
            <Skeleton className="h-8 w-64" />
          ) : (
            <h1 className="text-2xl font-bold sm:text-3xl">أهلًا، {displayName}</h1>
          )}
          <p className="mt-1 text-sm text-muted-foreground">ابدأ عملية تحقق جديدة أو راجع نشاطك</p>
        </div>

        {/* Quick verify */}
        <Card className="mb-8 border-white/[0.08] bg-gradient-to-b from-card to-card/60 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            تحقق سريع — تجريبي
          </div>
          <form onSubmit={runDemo} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="ألصق رابط خبر، فيديو، أو اكتب ادعاءً للتحقق..."
                className="ps-10 h-12 text-base" />
            </div>
            <Button type="submit" disabled={analyzing} className="h-12 gap-2 sm:px-8">
              {analyzing ? <><Activity className="h-4 w-4 animate-pulse" />جارٍ التحليل...</> : <><ShieldCheck className="h-4 w-4" />تحقق الآن</>}
            </Button>
          </form>

          {analyzing && (
            <div className="mt-6 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          )}

          {result && (
            <div className="mt-6 flex flex-col items-start gap-6 rounded-xl border border-white/[0.06] bg-background/50 p-5 sm:flex-row">
              <ConfidenceRing value={result.confidence} />
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <VerdictBadge verdict={result.verdict} />
                  <span className="mono text-xs text-muted-foreground">CONF {result.confidence}%</span>
                </div>
                <p className="text-sm text-foreground">{result.claim}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  ⚠ هذه نتيجة تجريبية للعرض. سيتم ربط محرك التحقق الحقيقي قريبًا.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "عمليات التحقق", value: "0", icon: ShieldCheck, hint: "ابدأ أول تحقق" },
            { label: "مضلّلات مكتشفة", value: "0", icon: AlertTriangle, hint: "—" },
            { label: "تقارير محفوظة", value: "0", icon: FileSearch, hint: "—" },
          ].map((s) => (
            <Card key={s.label} className="border-white/[0.06] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 display text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.hint}</div>
            </Card>
          ))}
        </div>

        {/* Empty activity */}
        <Card className="border-dashed border-white/[0.08] bg-transparent p-10 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-white/[0.08] bg-card">
            <Inbox className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="mb-1 text-lg font-semibold">لا يوجد نشاط بعد</h2>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            عمليات التحقق التي تنشئها ستظهر هنا. جرّب التحقق السريع بالأعلى للبدء.
          </p>
        </Card>
      </main>

      {/* Onboarding modal */}
      <Dialog open={showOnboard} onOpenChange={(o) => !o && finishOnboarding()}>
        <DialogContent className="max-w-md text-start">
          <DialogHeader>
            <DialogTitle className="text-xl">مرحبًا بك في رصد</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              منصة التحقق الرقمي للمحتوى العربي. يمكنك البدء فورًا بتحليل أي خبر أو رابط أو ادعاء.
            </DialogDescription>
          </DialogHeader>

          <ul className="space-y-3 py-2">
            {[
              { icon: Search, text: "ألصق رابطًا أو ادعاءً للتحقق منه" },
              { icon: ShieldCheck, text: "احصل على نتيجة موثّقة بنسبة ثقة" },
              { icon: FileSearch, text: "احفظ تقاريرك وراجعها لاحقًا" },
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
