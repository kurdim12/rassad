import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { Breadcrumbs } from "@/components/rasad/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import { Eye, ShieldCheck, Scale, Sparkles, Linkedin } from "lucide-react";

const TEAM = [
  { name: "أحمد القاضي", role: "المؤسس والرئيس التنفيذي", initial: "أ" },
  { name: "نور العبادي", role: "رئيس الهندسة والذكاء الاصطناعي", initial: "ن" },
  { name: "سلمى الطراونة", role: "رئيسة التحرير والتحقق", initial: "س" },
];

const TIMELINE = [
  { y: "2024", t: "التأسيس", d: "انطلقت فكرة رصد كاستجابة لانتشار التضليل في الفضاء العربي." },
  { y: "2025", t: "الإطلاق التجريبي", d: "أول نسخة مفتوحة لشريحة محدودة من الصحفيين والباحثين." },
  { y: "2026", t: "التوسّع الإقليمي", d: "إطلاق النسخة العامة وتوسيع شبكة الوكلاء عبر الدول العربية." },
];

const About = () => (
  <Layout>
    <Seo
      title="عن رصد | المهمة والرؤية والفريق"
      description="رصد منظومة عربية للتحقق الرقمي تأسست لمواجهة التضليل وحماية الفضاء المعلوماتي العربي. تعرّف على فريقنا ورحلتنا."
      path="/about"
    />
    <JsonLd data={buildBreadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "عن رصد", path: "/about" }])} />
    <Breadcrumbs items={[{ name: "عن رصد" }]} />

    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="container py-16 md:py-20">
        <div className="chip mb-4"><span className="mono text-[11px] tracking-widest">ABOUT · RASAD</span></div>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">عن رصد</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          رصد منظومة عربية للتحقق الرقمي، نعيد للحقيقة مكانتها وسط ضجيج المعلومات. نبني نظام تشغيل للثقة في الفضاء العربي.
        </p>
      </div>
    </section>

    {/* الرسالة والرؤية */}
    <section className="container py-16">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="glass-panel p-8">
          <div className="mono text-xs uppercase tracking-widest text-primary">رسالتنا</div>
          <h2 className="mt-3 text-2xl font-extrabold">حماية الوعي العربي من التضليل</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            نسعى إلى تمكين كل عربي من التحقق من المعلومة قبل تصديقها أو مشاركتها، ببناء أدوات ذكية، شفافة، وفي متناول الجميع.
          </p>
        </div>
        <div className="glass-panel p-8">
          <div className="mono text-xs uppercase tracking-widest text-primary">رؤيتنا</div>
          <h2 className="mt-3 text-2xl font-extrabold">أن نكون المرجع العربي الأول للتحقق الرقمي</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            نطمح أن يكون رصد الخيار الافتراضي لكل صحفي، باحث، ومؤسسة عربية تتعامل مع المحتوى الرقمي.
          </p>
        </div>
      </div>
    </section>

    {/* قصة التأسيس */}
    <section className="container py-16">
      <SectionHeader eyebrow="قصة التأسيس" title="لماذا أسّسنا رصد؟" />
      <div className="mx-auto max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
        <p>
          في خضمّ السنوات الأخيرة، تضاعف حجم المحتوى المنشور بالعربية على الإنترنت أضعافاً مضاعفة. لكن في المقابل، تضاعفت كذلك الأخبار الكاذبة، الفيديوهات المعدّلة، والادعاءات المضللة.
        </p>
        <p>
          لاحظنا غياب أداة عربية متخصصة، تفهم اللهجات، تستوعب السياق، وتعمل بالسرعة التي تتطلبها دورة الأخبار اليوم. فقررنا بناءها — للناس قبل المؤسسات، وللعربية قبل أي لغة أخرى.
        </p>
        <p className="text-foreground">
          رصد ليس مجرد منتج. هو موقف.
        </p>
      </div>
    </section>

    {/* القيم */}
    <section className="container py-16">
      <SectionHeader eyebrow="القيم" title="ما الذي يحرّك رصد" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: Eye, t: "الشفافية", d: "كل حكم مدعوم بأدلة قابلة للتتبع." },
          { Icon: ShieldCheck, t: "الأمان", d: "بياناتك ملكك، ومحمية بأعلى المعايير." },
          { Icon: Scale, t: "الدقة", d: "منهجية صارمة، بلا انحياز ولا أحكام مسبقة." },
          { Icon: Sparkles, t: "الانتماء العربي", d: "هندسة عربية بمعايير عالمية." },
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

    {/* الفريق */}
    <section className="container py-16">
      <SectionHeader eyebrow="الفريق" title="الأشخاص خلف رصد" subtitle="فريق صغير شغوف، يجمع بين الهندسة والصحافة والتحقق." />
      <div className="grid gap-5 md:grid-cols-3">
        {TEAM.map((m, i) => (
          <div key={i} className="glass-panel p-7 text-center">
            <div
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-info/20 text-2xl font-extrabold text-foreground ring-1 ring-white/10"
              aria-hidden
            >
              {m.initial}
            </div>
            <h3 className="mt-4 text-lg font-bold">{m.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
            <a
              href="#"
              aria-label={`لينكدإن ${m.name}`}
              className="mt-4 inline-grid h-9 w-9 place-items-center rounded-md border border-white/[0.08] text-muted-foreground hover:border-primary hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="container py-16">
      <SectionHeader eyebrow="الرحلة" title="محطات في طريق رصد" />
      <ol className="relative mx-auto max-w-2xl border-s border-white/[0.08] ps-6">
        {TIMELINE.map((it, i) => (
          <li key={i} className="mb-10 last:mb-0">
            <span className="absolute -start-[9px] grid h-4 w-4 place-items-center rounded-full bg-primary ring-4 ring-background" />
            <div className="display text-sm font-extrabold text-primary">{it.y}</div>
            <h3 className="mt-1 text-lg font-bold">{it.t}</h3>
            <p className="mt-1 text-sm leading-7 text-muted-foreground">{it.d}</p>
          </li>
        ))}
      </ol>
    </section>
  </Layout>
);

export default About;
