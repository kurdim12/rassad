import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { VerdictBadge } from "@/components/rasad/Badge";
import { ConfidenceRing } from "@/components/rasad/ConfidenceRing";
import { AgentCard } from "@/components/rasad/AgentCard";
import { NewsCard } from "@/components/rasad/NewsCard";
import {
  ShieldCheck, ArrowLeft, FileText, Image as ImageIcon, Video, AudioLines,
  Database, Filter, Globe, ScanSearch, GitCompareArrows, Gavel,
  Radio, MapPin, Clock, Activity, Layers,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />

        <div className="container grid gap-12 py-20 md:grid-cols-2 md:py-28">
          {/* LIVE PANEL (visually first on RTL = left col) */}
          <div className="order-2 md:order-1">
            <div className="glass-panel relative overflow-hidden p-6">
              <div className="absolute inset-0 -z-10 radar-bg opacity-60" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary pulse-ring" />
                  <span className="mono text-xs uppercase tracking-widest text-primary">LIVE SIGNAL</span>
                </div>
                <span className="mono text-xs text-muted-foreground">CASE #RS-2026-04219</span>
              </div>

              <h3 className="mt-5 text-xl font-bold leading-8">
                ادعاء متداول حول فيديو لانفجار في ميناء بحري — تحليل أولي يكشف مؤشرات تلاعب بصري
              </h3>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-background/40 p-3 text-center">
                  <ConfidenceRing value={42} size={56} label="الثقة" />
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-background/40 p-3 text-center">
                  <ConfidenceRing value={78} size={56} label="تلاعب" />
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-background/40 p-3 text-center">
                  <div className="mono text-2xl font-bold leading-none text-foreground">14</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">مصدر متقاطع</div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> الشرق الأوسط</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> منذ 12 دقيقة</span>
              </div>

              <div className="mt-5 space-y-2">
                {[
                  { Icon: Database, label: "تجميع الإشارات", state: "مكتمل" },
                  { Icon: Filter, label: "الفرز والترتيب", state: "مكتمل" },
                  { Icon: Globe, label: "تتبع المصادر", state: "قيد التنفيذ" },
                  { Icon: ScanSearch, label: "كشف التلاعب", state: "قيد التنفيذ" },
                  { Icon: Gavel, label: "إصدار الحكم", state: "بانتظار" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md border border-white/[0.05] bg-white/[0.02] px-3 py-2">
                    <s.Icon className="h-4 w-4 text-primary" />
                    <span className="flex-1 text-xs">{s.label}</span>
                    <span className="mono text-[10px] text-muted-foreground">{s.state}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <VerdictBadge verdict="suspicious" />
                <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                  الأدلة الكاملة <ArrowLeft className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* HEADLINE */}
          <div className="order-1 md:order-2">
            <div className="chip mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="mono text-[11px] tracking-widest">RASAD · INTELLIGENCE GRADE</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.15] md:text-6xl">
              رصد —
              <br />
              نحول <span className="text-primary">الضجيج الرقمي</span>
              <br />
              إلى حقيقة قابلة للتحقق.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              منصة عربية لتحليل الادعاءات والنصوص والصور والفيديو والصوت عبر شبكة وكلاء ذكية مدعومة بأدلة وتحقق متعدد المصادر.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <VerdictBadge verdict="trusted" />
              <VerdictBadge verdict="suspicious" />
              <VerdictBadge verdict="fake" />
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/social" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary/80 px-6 py-3 font-semibold text-primary-foreground signal-glow ring-1 ring-white/10 hover:brightness-110">
                <ShieldCheck className="h-4 w-4" /> تحقق من خبر الآن
              </Link>
              <Link to="/reports" className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-6 py-3 font-semibold hover:bg-white/[0.06]">
                استكشف التقارير <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-6">
              {[
                { v: "+90K", l: "تقرير تحقق" },
                { v: "+120", l: "مصدر موثوق" },
                { v: "92%", l: "متوسط الثقة" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="mono text-2xl font-extrabold text-foreground">{s.v}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM STORY */}
      <section className="container py-24">
        <SectionHeader eyebrow="المنهجية" title="كيف نصل إلى الحقيقة"
          subtitle="رحلة مهيكلة من الإشارة الخام إلى الحكم النهائي عبر ست مراحل دقيقة." />

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            { Icon: Radio, title: "استقبال الإشارة" },
            { Icon: Layers, title: "معالجة لغوية عربية" },
            { Icon: Globe, title: "تتبع المصادر" },
            { Icon: GitCompareArrows, title: "مقارنة متقاطعة" },
            { Icon: ScanSearch, title: "كشف التلاعب" },
            { Icon: Gavel, title: "إصدار الحكم" },
          ].map((s, i) => (
            <div key={i} className="glass-panel relative p-5">
              <div className="mono mb-3 text-[10px] tracking-widest text-muted-foreground">STEP 0{i + 1}</div>
              <s.Icon className="mb-4 h-6 w-6 text-primary" strokeWidth={1.75} />
              <div className="text-sm font-bold leading-6">{s.title}</div>
              {i < 5 && <div className="absolute -end-2 top-1/2 hidden h-px w-4 bg-primary/40 lg:block" />}
            </div>
          ))}
        </div>
      </section>

      {/* WHAT TO VERIFY */}
      <section className="container py-16">
        <SectionHeader eyebrow="بدء التحقق" title="ماذا تريد أن تتحقق منه؟"
          subtitle="اختر نوع المحتوى وابدأ التحقق فورًا." />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: FileText, title: "نص / مقال", desc: "ألصق نص الادعاء أو رابط المقال", ph: "ألصق النص أو الرابط هنا…" },
            { Icon: ImageIcon, title: "صورة", desc: "ارفع صورة للتحقق من أصالتها", ph: "اسحب الصورة أو ارفعها" },
            { Icon: Video, title: "فيديو", desc: "تحقق من فيديو متداول", ph: "ألصق رابط الفيديو…" },
            { Icon: AudioLines, title: "صوت", desc: "تحقق من تسجيل صوتي", ph: "ارفع ملفًا صوتيًا" },
          ].map((c, i) => (
            <div key={i} className="glass-panel group p-6 transition hover:-translate-y-0.5 hover:border-primary/30">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <c.Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-4 rounded-md border border-dashed border-white/[0.1] bg-background/40 px-3 py-3 text-xs text-muted-foreground/70">
                {c.ph}
              </div>
              <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/30 hover:bg-primary/15">
                تحقق الآن <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* AGENTS PREVIEW */}
      <section className="container py-24">
        <SectionHeader eyebrow="منظومة الوكلاء" title="كيف يعمل رصد"
          subtitle="ست وكلاء ذكية متخصصة تعمل بتناغم لتحويل الإشارات إلى أحكام." />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AgentCard Icon={Database} title="وكيل الجمع" desc="يلتقط الإشارات والادعاءات من شبكات متعددة في الوقت الحقيقي." />
          <AgentCard Icon={Filter} title="وكيل الفرز" desc="يصنّف ويرتّب الإشارات حسب الأهمية والمخاطر." />
          <AgentCard Icon={Globe} title="وكيل المصادر" desc="يقتفي أثر المصدر الأصلي ويبني سلسلة الاستناد." />
          <AgentCard Icon={ScanSearch} title="كاشف التلاعب" desc="يكشف التعديل البصري والصوتي ومحتوى الذكاء الاصطناعي." accent />
          <AgentCard Icon={GitCompareArrows} title="محرك المقارنة" desc="يقارن الادعاء بمراجع موثوقة ومحتوى متطابق." />
          <AgentCard Icon={Gavel} title="وكيل الحكم" desc="يصدر الحكم النهائي مع درجة الثقة وسلسلة الأدلة." />
        </div>
      </section>

      {/* PUBLIC LEDGER */}
      <section className="container pb-24">
        <SectionHeader eyebrow="السجل العام" title="سجل التحقق العام"
          subtitle="نماذج من أحدث القضايا المنشورة بأحكامها." />

        <div className="grid gap-5 md:grid-cols-3">
          <NewsCard title="تصريح منسوب لمسؤول حول رفع الدعم — متطابق مع المصدر الرسمي" category="سياسة" verdict="trusted" confidence={94} sources={9} time="منذ ساعة" />
          <NewsCard title="فيديو متداول لاحتشاد جماهيري — يعود لحدث سابق بسنوات" category="سوشال ميديا" verdict="fake" confidence={88} sources={6} time="منذ 3 ساعات" />
          <NewsCard title="ادعاء حول دواء جديد لمرض مزمن — معطيات منقوصة بحاجة لمراجعة طبية" category="صحة" verdict="suspicious" confidence={61} sources={4} time="منذ 6 ساعات" />
        </div>

        <div className="mt-10 flex items-center justify-center">
          <Link to="/news" className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-semibold hover:border-primary/30 hover:bg-white/[0.06]">
            <Activity className="h-4 w-4" /> اذهب إلى مركز الأخبار
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
