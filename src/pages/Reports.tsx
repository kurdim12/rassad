import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { ArrowLeft, BookOpen, Calendar, Clock, Send, TrendingUp } from "lucide-react";

const featured = [
  { tag: "ذكاء اصطناعي", title: "حين تُصبح الصورة سلاحًا: تحليل لظاهرة المحتوى المولّد آليًا في الفضاء العربي", time: "12 دقيقة" },
  { tag: "منهجية", title: "كيف يُبنى الحكم في رصد: من الإشارة إلى سلسلة الأدلة", time: "8 دقائق" },
  { tag: "اتجاهات", title: "خريطة التضليل الإقليمي خلال الربع الأخير: أنماط ومؤشرات", time: "15 دقيقة" },
];

const reports = [
  { tag: "تحقيق", title: "شبكة حسابات منسّقة استهدفت قضية إنسانية بمحتوى مزيّف", date: "18 أبريل 2026", time: "9 د" },
  { tag: "تحليل", title: "اللغة بوصفها أداة تضليل: قراءة في خطاب الادعاء الرقمي", date: "11 أبريل 2026", time: "7 د" },
  { tag: "بحث", title: "بصمات الفيديو المولّد آليًا: ماذا تكشف الإطارات؟", date: "5 أبريل 2026", time: "13 د" },
  { tag: "تقرير", title: "أنماط الانتشار الفيروسي في الأسبوع الأول من الأزمات", date: "30 مارس 2026", time: "10 د" },
  { tag: "منهجية", title: "حدود الذكاء الاصطناعي في الكشف عن التلاعب البصري", date: "22 مارس 2026", time: "11 د" },
  { tag: "تحقيق", title: "حين يصبح الصوت قابلًا للتزوير: قصة تسجيل منسوب لمسؤول", date: "14 مارس 2026", time: "14 د" },
];

const popular = [
  "كيف يصمد الخبر أمام الذكاء الاصطناعي؟",
  "خريطة المصادر العربية الموثوقة 2026",
  "خمس علامات تكشف الصورة المولّدة آليًا",
  "بناء عضلة التحقق لدى الجمهور",
];

const Reports = () => (
  <Layout>
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 radar-bg opacity-50" />
      <div className="container py-20">
        <div className="chip mb-4"><span className="mono text-[11px] tracking-widest">REPORTS · ANALYSIS</span></div>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">تقارير وتحليلات رصد</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">تقارير معمّقة، تحقيقات استقصائية، ودراسات حول التضليل والذكاء الاصطناعي ومنهجيات التحقق.</p>
      </div>
    </section>

    <section className="container py-12">
      <SectionHeader align="right" eyebrow="مختارات المحررين" title="تقارير في الواجهة" />
      <div className="grid gap-5 md:grid-cols-3">
        {featured.map((r, i) => (
          <article key={i} className={`glass-panel group overflow-hidden ${i === 0 ? "md:row-span-2 md:col-span-1" : ""}`}>
            <div className="relative h-44 overflow-hidden bg-surface-2">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute inset-0 radar-bg opacity-60" />
              <span className="absolute end-3 top-3 chip mono">{r.tag}</span>
            </div>
            <div className="space-y-3 p-6">
              <h3 className="text-lg font-bold leading-8">{r.title}</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {r.time}</span>
                <span className="inline-flex items-center gap-1 text-primary group-hover:underline">قراءة <ArrowLeft className="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="container grid gap-10 py-10 lg:grid-cols-[1fr_320px]">
      <div>
        <SectionHeader align="right" eyebrow="الأرشيف" title="أحدث التقارير" />
        <div className="grid gap-5 md:grid-cols-2">
          {reports.map((r, i) => (
            <article key={i} className="glass-panel p-6 transition hover:-translate-y-0.5 hover:border-primary/30">
              <div className="flex items-center justify-between">
                <span className="chip mono">{r.tag}</span>
                <span className="mono text-[11px] text-muted-foreground">#{String(i + 1).padStart(3, "0")}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-8">{r.title}</h3>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {r.date}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {r.time}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="space-y-6">
        <div className="glass-panel p-6">
          <h4 className="mb-4 inline-flex items-center gap-2 text-sm font-bold"><TrendingUp className="h-4 w-4 text-primary" /> الأكثر قراءة</h4>
          <ul className="space-y-3">
            {popular.map((p, i) => (
              <li key={i} className="flex gap-3 border-b border-white/[0.05] pb-3 last:border-none last:pb-0">
                <span className="mono text-lg font-extrabold text-primary/70">0{i + 1}</span>
                <a href="#" className="text-sm leading-6 text-foreground/90 hover:text-primary">{p}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-6">
          <h4 className="mb-4 inline-flex items-center gap-2 text-sm font-bold"><BookOpen className="h-4 w-4 text-primary" /> أحدث التقارير</h4>
          <ul className="space-y-3 text-sm">
            {reports.slice(0, 4).map((r, i) => (
              <li key={i} className="border-b border-white/[0.05] pb-3 last:border-none last:pb-0">
                <a href="#" className="text-foreground/90 hover:text-primary">{r.title}</a>
                <div className="mt-1 mono text-[11px] text-muted-foreground">{r.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>

    {/* Newsletter */}
    <section className="container py-20">
      <div className="glass-panel relative overflow-hidden p-10 md:p-14">
        <div className="absolute inset-0 -z-10 radar-bg opacity-60" />
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-3xl font-extrabold leading-tight md:text-4xl">ابقَ في قلب الحقيقة</h3>
            <p className="mt-3 text-muted-foreground">اشترك لتصلك تقارير رصد الأسبوعية وتحليلاتنا المعمّقة مباشرة إلى بريدك.</p>
          </div>
          <form className="flex overflow-hidden rounded-lg border border-white/[0.08] bg-background/50">
            <input placeholder="بريدك الإلكتروني" className="flex-1 bg-transparent px-4 py-4 text-sm outline-none placeholder:text-muted-foreground/60" />
            <button type="button" className="inline-flex items-center gap-2 bg-primary px-6 text-sm font-semibold text-primary-foreground hover:brightness-110">
              <Send className="h-4 w-4" /> اشترك
            </button>
          </form>
        </div>
      </div>
    </section>
  </Layout>
);

export default Reports;
