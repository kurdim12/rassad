import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { VerdictBadge } from "@/components/rasad/Badge";
import { ConfidenceRing } from "@/components/rasad/ConfidenceRing";
import { DocumentedFakes } from "@/components/rasad/DocumentedFakes";
import { LiveTicker } from "@/components/rasad/LiveTicker";
import { CountUp } from "@/components/rasad/CountUp";
import { Reveal } from "@/components/rasad/Reveal";
import { Seo } from "@/components/seo/Seo";
import { JsonLd, organizationSchema, webApplicationSchema, buildFaqSchema } from "@/components/seo/JsonLd";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  ArrowLeft,
  Play,
  Star,
  Clock,
  Users,
  Award,
  Target,
  Sparkles,
  Search,
  Eye,
  FileCheck,
  Zap,
  Lock,
  FileText,
  Code2,
  Languages,
  RefreshCw,
  User,
  Building2,
  Landmark,
  Check,
  MapPin,
  Database,
  Filter,
  Globe,
  ScanSearch,
  Gavel,
  Activity,
} from "lucide-react";

const FAQ = [
  {
    q: "ما هو رصد وكيف يعمل؟",
    a: "رصد منصة عربية للتحقق من الأخبار والمحتوى الرقمي. تستخدم شبكة من الوكلاء الذكية لجمع الإشارات، تتبع المصادر، كشف التلاعب، ومقارنة الادعاءات بمراجع موثوقة لإصدار حكم نهائي بدرجة ثقة شفافة.",
  },
  {
    q: "ما مدى أمان بياناتي على المنصة؟",
    a: "جميع البيانات مشفّرة بمعيار AES-256 وتُنقل عبر HTTPS. لا نشارك بياناتك مع طرف ثالث ولا نستخدمها لأي غرض خارج تحسين خدمات التحقق وفق سياسة الخصوصية.",
  },
  {
    q: "هل يمكنني تجربة رصد قبل الاشتراك؟",
    a: "نعم. الباقة المجانية تتيح لك إجراء عمليات تحقق محدودة شهرياً بدون بطاقة بنكية ولا التزام، يمكنك ترقية الحساب أو إلغاؤه في أي وقت.",
  },
  {
    q: "ما الفرق بين الباقة المجانية والاحترافية؟",
    a: "الباقة المجانية مناسبة للأفراد والاستخدام الخفيف. الاحترافية تمنحك تحققاً غير محدود، وصولاً للـ API، تقارير قابلة للتصدير بصيغة PDF/CSV، ودعماً ذا أولوية.",
  },
  {
    q: "كيف أتواصل مع فريق الدعم؟",
    a: "عبر بريد hello@rassad.io أو عبر واتساب الدعم من صفحة التواصل. ساعات العمل: الأحد إلى الخميس من 9 صباحاً حتى 6 مساءً بتوقيت عمّان.",
  },
];

const TESTIMONIALS = [
  {
    name: "خالد المنصور",
    role: "مدير المشتريات",
    company: "مجموعة الأفق",
    text: "صار رصد جزءاً يومياً من سير العمل عندنا. قبل اعتماد أي خبر يخص السوق نمرّره عليه — وفّر علينا أخطاء كان يمكن أن تكلّفنا الكثير.",
  },
  {
    name: "ليلى الحسيني",
    role: "صحفية تحقيق",
    company: "غرفة أخبار مستقلة",
    text: "الذي يميّز رصد ليس السرعة فقط، بل سلسلة الأدلة الواضحة. كل حكم مرفق بمصادره — وهذا ما نحتاجه في عملنا الصحفي.",
  },
  {
    name: "د. عمر الزعبي",
    role: "أستاذ الإعلام الرقمي",
    company: "جامعة الأردن",
    text: "أفضل أداة عربية رأيتها لتحليل الادعاءات والمحتوى المرئي. أنصح بها طلابي في مساقات الإعلام الرقمي والتحقق.",
  },
];

const Home = () => {
  

  return (
    <Layout>
      <Seo
        title="رصد | منصة التحقق من الأخبار العربية — فوري وآمن"
        description="رصد منصة عربية للتحقق من الأخبار والصور والفيديو والصوت في ثوانٍ بدقة عالية وأدلة كاملة. ابدأ مجاناً بدون بطاقة بنكية."
        path="/"
      />
      <JsonLd data={[organizationSchema, webApplicationSchema, buildFaqSchema(FAQ)]} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />

        <div className="container grid gap-12 py-16 md:grid-cols-2 md:py-24">
          {/* LIVE PANEL */}
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
                <Link to="/news" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                  الأدلة الكاملة <ArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* HEADLINE */}
          <div className="order-1 md:order-2">
            <div className="chip mb-5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[12px]">التحقق الرقمي الأسرع في المنطقة العربية</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.15] md:text-5xl lg:text-6xl">
              تحقّق من أي خبر <br />
              في <span className="text-primary">ثوانٍ معدودة</span> <br />
              بأدلة لا تقبل الشك.
            </h1>
            <h2 className="mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              رصد منصة عربية لتحليل الأخبار والصور والفيديو والصوت عبر شبكة وكلاء ذكية، مع تحقق متعدد المصادر وأحكام شفافة قابلة للتتبع.
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary/80 px-6 py-3.5 font-bold text-primary-foreground signal-glow ring-1 ring-white/10 hover:brightness-110"
                style={{ minHeight: 48 }}
              >
                ابدأ مجاناً الآن <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-6 py-3.5 font-semibold hover:bg-white/[0.06]"
                style={{ minHeight: 48 }}
              >
                <Play className="h-4 w-4" /> شاهد كيف يعمل
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-warning">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-warning" />)}
              </span>
              <span>يثق بنا أكثر من <strong className="text-foreground">500 صحفي ومؤسسة</strong></span>
              <span aria-hidden>·</span>
              <span>مجاناً للبدء</span>
              <span aria-hidden>·</span>
              <span>بدون بطاقة بنكية</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <VerdictBadge verdict="trusted" />
              <VerdictBadge verdict="suspicious" />
              <VerdictBadge verdict="fake" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-white/[0.06] bg-surface/40">
        <div className="container grid gap-6 py-10 md:grid-cols-4">
          {[
            { end: 10000, prefix: "+", suffix: "", l: "عملية تحقق منجزة", Icon: Activity },
            { end: 99.9, suffix: "%", decimals: 1, l: "دقة التحليل", Icon: Target },
            { end: 30, prefix: "< ", suffix: " ثانية", l: "متوسط زمن الاستجابة", Icon: Zap },
            { end: 500, prefix: "+", l: "مستخدم موثوق", Icon: Users },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-primary">
                  <s.Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div>
                  <CountUp
                    end={s.end}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix ?? ""}
                    decimals={s.decimals ?? 0}
                    className="display text-2xl font-extrabold text-foreground md:text-3xl"
                  />
                  <div className="mt-0.5 text-xs text-muted-foreground">{s.l}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LIVE TICKER (compact) */}
      <section className="container py-16">
        <SectionHeader
          eyebrow="البث المباشر"
          title="ما يجري الآن في الفضاء الرقمي"
          subtitle="عيّنة لحظية من أحدث الأخبار والادعاءات المُحلَّلة. تحديث كل 12 ثانية."
        />
        <div className="mx-auto max-w-3xl">
          <LiveTicker variant="compact" limit={5} />
        </div>
      </section>

      {/* HOW IT WORKS — 3 STEPS */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="كيف يعمل رصد"
          title="ثلاث خطوات للوصول إلى الحقيقة"
          subtitle="من الإشارة الأولى إلى الحكم المدعوم بالأدلة — رحلة مهيكلة وشفافة."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "01", Icon: Search, t: "أدخل المحتوى", d: "ألصق نص الادعاء، رابط الخبر، أو ارفع صورة/فيديو/تسجيلاً صوتياً تريد التحقق منه." },
            { n: "02", Icon: Eye, t: "رصد يُحلّل", d: "وكلاؤنا الذكية يفحصون المصادر الموثوقة، يكشفون التلاعب، ويقارنون الادعاء بقواعد بيانات حية." },
            { n: "03", Icon: FileCheck, t: "احصل على التقرير", d: "حكم نهائي بدرجة ثقة شفافة، مع سلسلة أدلة كاملة قابلة للتصدير ومشاركتها." },
          ].map((s) => (
            <div key={s.n} className="glass-panel relative p-7">
              <div className="display absolute end-6 top-6 text-5xl font-extrabold text-primary/15">{s.n}</div>
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-primary">
                <s.Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            شاهد عرضاً تفصيلياً <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FEATURES — 6 in 3x2 */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="المميزات"
          title="منظومة كاملة للتحقق الرقمي"
          subtitle="أدوات متخصصة بنيت بعناية للسرعة، الدقة، والثقة."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { Icon: Zap, t: "تحقق فوري", d: "نتائج في أقل من 30 ثانية لمعظم العمليات، مهما كان نوع المحتوى." },
            { Icon: Lock, t: "أمان عالٍ", d: "تشفير AES-256 للبيانات وحماية كاملة لخصوصيتك ومستنداتك." },
            { Icon: FileText, t: "تقارير مفصّلة", d: "تقارير شاملة قابلة للتصدير بصيغ PDF و CSV مع كل أدلة الحكم." },
            { Icon: Code2, t: "API موثّق", d: "اربط رصد بأنظمتك ومنصاتك عبر REST API بتوثيق عربي وإنجليزي." },
            { Icon: Languages, t: "دعم عربي كامل", d: "واجهة، تقارير، وخدمة عملاء بالعربية الفصحى — بدون ترجمة آلية." },
            { Icon: RefreshCw, t: "تدقيق مستمر", d: "تحديث قواعد البيانات والمصادر الموثوقة كل 24 ساعة." },
          ].map((f, i) => (
            <div key={i} className="glass-panel group p-6 transition hover:-translate-y-0.5 hover:border-primary/30">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-primary">
                <f.Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-lg font-bold">{f.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="لمن هو رصد"
          title="حلٌّ لكل من يحتاج إلى الحقيقة"
          subtitle="من الفرد إلى المؤسسة الحكومية — منظومة تكيّف نفسها مع احتياجاتك."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { Icon: User, t: "الأفراد", d: "تحقق من أي خبر أو ادعاء قبل مشاركته، وكن جزءاً من مجتمع يقاوم التضليل.", to: "/verify" },
            { Icon: Building2, t: "الشركات والإعلام", d: "احم سمعة مؤسستك وموظفيك من الأخبار الكاذبة، وادعم قراراتك بمعلومة موثقة.", to: "/contact" },
            { Icon: Landmark, t: "الحكومات والجهات الرسمية", d: "أدوات مؤسسية متقدمة لرصد الحملات الممنهجة والتحقق على نطاق واسع.", to: "/contact" },
          ].map((a, i) => (
            <div key={i} className="glass-panel p-7">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20">
                <a.Icon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-xl font-bold">{a.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{a.d}</p>
              <Link
                to={a.to}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                اعرف المزيد <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* DOCUMENTED FAKES — real cases with sources */}
      <DocumentedFakes />

      {/* TESTIMONIALS */}
      <section className="border-y border-white/[0.06] bg-surface/30">
        <div className="container py-20">
          <SectionHeader
            eyebrow="آراء المستخدمين"
            title="ما يقوله مستخدمو رصد"
            subtitle="صحفيون، باحثون، ومدراء يعتمدون على رصد كل يوم."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="glass-panel flex h-full flex-col p-7">
                <div className="flex items-center gap-1 text-warning">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-warning" />)}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-8 text-foreground/90">
                  «{t.text}»
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-info/20 text-sm font-extrabold text-foreground ring-1 ring-white/10"
                    aria-hidden
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="الأسئلة الشائعة"
          title="أسئلة سمعناها كثيراً"
          subtitle="إن لم تجد إجابتك هنا، تواصل معنا مباشرة."
        />

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`q-${i}`}
                className="glass-panel overflow-hidden border-white/[0.06] px-5"
              >
                <AccordionTrigger className="text-start text-base font-bold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-8 text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-y border-white/[0.06]">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 radar-bg opacity-50" />
        <div className="container py-20 text-center">
          <div className="chip mx-auto mb-5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[12px]">انضم إلى المنظومة</span>
          </div>
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            ابدأ رحلتك نحو <span className="text-primary">التحقق الرقمي</span> الآن
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            انضم إلى أكثر من 500 صحفي ومؤسسة يحمون أنفسهم ومجتمعاتهم من التضليل يومياً مع رصد.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary/80 px-7 py-4 text-base font-bold text-primary-foreground signal-glow ring-1 ring-white/10 hover:brightness-110"
              style={{ minHeight: 48 }}
            >
              <ShieldCheck className="h-5 w-5" />
              أنشئ حسابك المجاني <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            بدون بطاقة بنكية · إلغاء في أي وقت · دعم عربي على مدار الساعة
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
