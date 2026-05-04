import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { NewsCard } from "@/components/rasad/NewsCard";
import { VerdictBadge } from "@/components/rasad/Badge";
import { ConfidenceRing } from "@/components/rasad/ConfidenceRing";
import { Search, Calendar, Tag, Filter, RotateCcw, ArrowLeft } from "lucide-react";

const featured = {
  title: "تحقق موسّع: حملة تضليل منظمة استخدمت صورًا مولّدة بالذكاء الاصطناعي خلال أزمة إقليمية",
  category: "تحقيق",
  confidence: 91,
  sources: 18,
  time: "اليوم",
};

const items = [
  { title: "بيان منسوب لجهة رسمية حول قرار اقتصادي — مطابقة كاملة للمصدر", category: "اقتصاد", verdict: "trusted", confidence: 96, sources: 11, time: "منذ ساعة" },
  { title: "صورة متداولة لتجمع — ثبت أنها من حدث قبل ثلاث سنوات", category: "وسائط", verdict: "fake", confidence: 89, sources: 7, time: "منذ 3 ساعات" },
  { title: "ادعاء حول لقاح جديد — معطيات غير مكتملة وبحاجة لمراجعة علمية", category: "صحة", verdict: "suspicious", confidence: 58, sources: 4, time: "منذ 5 ساعات" },
  { title: "فيديو لانفجار يدّعي توقيتًا حديثًا — يعود لأرشيف 2019", category: "وسائط", verdict: "fake", confidence: 92, sources: 8, time: "منذ 6 ساعات" },
  { title: "تصريح منسوب لمسؤول رياضي — تأكيد رسمي عبر القناة المعتمدة", category: "رياضة", verdict: "trusted", confidence: 90, sources: 6, time: "منذ 8 ساعات" },
  { title: "رسالة متداولة عبر واتساب حول قرار حكومي — لا مصدر رسمي", category: "سوشال ميديا", verdict: "suspicious", confidence: 47, sources: 2, time: "أمس" },
  { title: "صورة مولّدة بالذكاء الاصطناعي تنتشر كحدث حقيقي", category: "تكنولوجيا", verdict: "fake", confidence: 95, sources: 9, time: "أمس" },
  { title: "تقرير عن ارتفاع أسعار سلعة أساسية — متوافق مع بيانات السوق", category: "اقتصاد", verdict: "trusted", confidence: 88, sources: 7, time: "أمس" },
] as const;

const News = () => (
  <Layout>
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="container py-20">
        <div className="chip mb-4"><span className="mono text-[11px] tracking-widest">NEWS · VERIFIED</span></div>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">مركز الأخبار المتحقق منها</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">قاعدة معرفية حية للقصص التي تم التحقق منها عبر منظومة وكلاء رصد، مع سلاسل أدلة كاملة لكل قضية.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { v: "+90K", l: "تقرير منشور" },
            { v: "+120", l: "مصدر موثوق" },
            { v: "92%", l: "متوسط الثقة" },
            { v: "24/7", l: "مراقبة مستمرة" },
            { v: "127", l: "قضية جديدة اليوم" },
          ].map((s, i) => (
            <div key={i} className="glass-panel p-4">
              <div className="mono text-2xl font-extrabold">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FILTERS */}
    <section className="container py-10">
      <div className="glass-panel p-5">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="ابحث في القصص المتحقق منها…" className="w-full rounded-md border border-white/[0.08] bg-background/40 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-primary/40" />
          </div>
          {[
            { Icon: Calendar, ph: "التاريخ" },
            { Icon: Tag, ph: "التصنيف" },
            { Icon: Filter, ph: "الحكم" },
          ].map((f, i) => (
            <div key={i} className="relative md:col-span-2">
              <f.Icon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select className="w-full appearance-none rounded-md border border-white/[0.08] bg-background/40 py-2.5 pr-10 pl-3 text-sm outline-none">
                <option>{f.ph}</option>
              </select>
            </div>
          ))}
          <button className="md:col-span-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] py-2.5 text-xs text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-3.5 w-3.5" /> إعادة
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["كل التصنيفات", "سياسة", "اقتصاد", "صحة", "تكنولوجيا", "وسائط مرئية", "سوشال ميديا", "رياضة"].map((c, i) => (
            <button key={i} className={`rounded-full border px-3 py-1 text-xs ${i === 0 ? "border-primary/40 bg-primary/10 text-primary" : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:text-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURED */}
    <section className="container">
      <div className="glass-panel grid overflow-hidden md:grid-cols-2">
        <div className="relative min-h-[280px] bg-gradient-to-br from-surface-2 to-background">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 radar-bg" />
          <div className="absolute right-4 top-4 chip mono">{featured.category}</div>
        </div>
        <div className="p-8">
          <VerdictBadge verdict="trusted" />
          <h2 className="mt-4 text-2xl font-extrabold leading-9 md:text-3xl">{featured.title}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            تحليل عميق لشبكة حسابات نسّقت نشر مواد بصرية مولّدة آليًا. تتبع المصادر، فحص البصمات، ومقارنة السياق التاريخي.
          </p>
          <div className="mt-6 flex items-center gap-6">
            <ConfidenceRing value={featured.confidence} size={68} label="ثقة" />
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>{featured.sources} مصدر متقاطع</div>
              <div>{featured.time}</div>
            </div>
            <button className="ms-auto inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground signal-glow hover:brightness-110">
              عرض تقرير التحقق <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* GRID */}
    <section className="container py-14">
      <SectionHeader align="right" eyebrow="أحدث القضايا" title="آخر التحقيقات المنشورة" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((n, i) => <NewsCard key={i} {...n} />)}
      </div>
    </section>
  </Layout>
);

export default News;
