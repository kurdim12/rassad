import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { Eye, ShieldCheck, Scale, Sparkles } from "lucide-react";

const About = () => (
  <Layout>
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="container py-20">
        <div className="chip mb-4"><span className="mono text-[11px] tracking-widest">ABOUT · RASAD</span></div>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">عن رصد</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          رصد منظومة عربية للتحقق الرقمي تعيد للحقيقة مكانتها وسط ضجيج المعلومات. نبني نظام تشغيل للثقة في الفضاء العربي.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <SectionHeader eyebrow="القيم" title="ما الذي يحرّك رصد" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: Eye, t: "اليقظة", d: "نراقب الإشارة لحظة ولادتها." },
          { Icon: ShieldCheck, t: "الثقة", d: "كل حكم مدعوم بأدلة قابلة للتتبع." },
          { Icon: Scale, t: "الإنصاف", d: "منهجية شفافة بلا انحياز." },
          { Icon: Sparkles, t: "الإتقان", d: "هندسة عربية لمعيار عالمي." },
        ].map((c, i) => (
          <div key={i} className="glass-panel p-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
              <c.Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-bold">{c.t}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default About;
