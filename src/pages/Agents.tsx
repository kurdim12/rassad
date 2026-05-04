import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { AgentCard } from "@/components/rasad/AgentCard";
import {
  Database, Filter, Globe, ScanSearch, GitCompareArrows, Gavel,
  FileText, Image as ImageIcon, Video, AudioLines, ShieldCheck, Network, ArrowLeft,
} from "lucide-react";

const Agents = () => (
  <Layout>
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="container grid items-center gap-12 py-20 md:grid-cols-2">
        <div>
          <div className="chip mb-4"><span className="mono text-[11px] tracking-widest">AGENTS · OS</span></div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">منظومة الوكلاء</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">شبكة متخصصة من الوكلاء تعمل بتناغم لتحويل الإشارات الخام إلى أحكام مدعومة بالأدلة، عبر طبقات تحقق متعددة.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground signal-glow">
              <Network className="h-4 w-4" /> استكشف منظومة الوكلاء
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-semibold">
              عرض المخطط التفاعلي <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Network visual */}
        <div className="relative aspect-square w-full max-w-md justify-self-center md:justify-self-end">
          <div className="absolute inset-0 radar-bg" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow signal-glow ring-1 ring-white/20">
              <ShieldCheck className="h-12 w-12 text-primary-foreground" />
              <span className="absolute inset-0 rounded-2xl pulse-ring" />
            </div>
          </div>
          {[Database, Filter, Globe, ScanSearch, GitCompareArrows, Gavel].map((Icon, i, arr) => {
            const angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
            const r = 42;
            const x = 50 + r * Math.cos(angle);
            const y = 50 + r * Math.sin(angle);
            return (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.1] bg-surface/80 backdrop-blur">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            );
          })}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + 42 * Math.cos(angle);
              const y = 50 + 42 * Math.sin(angle);
              return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="hsl(var(--primary))" strokeOpacity="0.25" strokeDasharray="2 2" />;
            })}
          </svg>
        </div>
      </div>
    </section>

    {/* MAIN AGENTS */}
    <section className="container py-20">
      <SectionHeader eyebrow="الوكلاء الرئيسيون" title="ست وكلاء يعملون كأوركسترا"
        subtitle="كل وكيل يؤدي دورًا متخصصًا في رحلة التحقق." />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AgentCard Icon={Database} title="وكيل الجمع" desc="يجمع الإشارات والادعاءات من شبكات متعددة." placeholder="ألصق رابطًا أو نصًا للجمع…" />
        <AgentCard Icon={Filter} title="وكيل الفرز" desc="يصنّف الإشارات بحسب الأولوية والمخاطر." placeholder="أدخل كلمة مفتاحية للفرز…" />
        <AgentCard Icon={Globe} title="وكيل المصادر" desc="يبني سلسلة المصدر الأصلي وأثره الرقمي." placeholder="ألصق رابط الادعاء…" />
        <AgentCard Icon={ScanSearch} title="كاشف التلاعب" desc="يكشف التعديل والوسائط المولّدة آليًا." placeholder="ارفع صورة أو فيديو…" accent />
        <AgentCard Icon={GitCompareArrows} title="محرك المقارنة" desc="يقارن الادعاء بمراجع وقواعد بيانات." placeholder="ألصق نص الادعاء…" />
        <AgentCard Icon={Gavel} title="وكيل الحكم" desc="يصدر الحكم النهائي بدرجة ثقة وأدلة." placeholder="معرّف القضية…" />
      </div>
    </section>

    {/* SPECIAL AGENTS */}
    <section className="container py-10">
      <SectionHeader eyebrow="مدققون متخصصون" title="حسب نوع المحتوى"
        subtitle="مدققون مهيّأون للنص والصور والفيديو والصوت." />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <AgentCard Icon={FileText} title="مدقق النص / المقال" desc="تحليل لغوي وادعاءات مرجعية." placeholder="ألصق النص أو الرابط" />
        <AgentCard Icon={ImageIcon} title="مدقق الصورة" desc="فحص الأصالة والبصمات الرقمية." placeholder="ارفع الصورة" />
        <AgentCard Icon={Video} title="مدقق الفيديو" desc="فحص الإطارات والصوت والسياق." placeholder="رابط الفيديو" />
        <AgentCard Icon={AudioLines} title="مدقق الصوت" desc="بصمة صوتية واكتشاف التزييف." placeholder="ارفع التسجيل" />
      </div>
    </section>

    {/* WORKFLOW */}
    <section className="container py-24">
      <SectionHeader eyebrow="الرحلة" title="من الإشارة إلى الحكم — رحلة متكاملة" />

      <div className="glass-panel relative overflow-x-auto p-8">
        <div className="flex min-w-[820px] items-center justify-between gap-4">
          {[
            { Icon: Database, t: "Inputs" },
            { Icon: Filter, t: "Collector" },
            { Icon: Globe, t: "Source" },
            { Icon: ScanSearch, t: "Manipulation" },
            { Icon: GitCompareArrows, t: "Compare" },
            { Icon: Gavel, t: "Verdict" },
          ].map((s, i, arr) => (
            <div key={i} className="flex items-center gap-4">
              <div className="grid place-items-center text-center">
                <div className="grid h-14 w-14 place-items-center rounded-xl border border-white/[0.08] bg-background/60">
                  <s.Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="mono mt-2 text-[10px] tracking-widest text-muted-foreground">{s.t}</div>
              </div>
              {i < arr.length - 1 && <div className="h-px w-12 bg-gradient-to-r from-primary/60 to-transparent" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Agents;
