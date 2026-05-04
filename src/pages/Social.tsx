import { useState } from "react";
import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { ConfidenceRing } from "@/components/rasad/ConfidenceRing";
import { VerdictBadge } from "@/components/rasad/Badge";
import {
  Twitter, Instagram, Facebook, Send, MessageCircle, Music2,
  Link2, Image as ImageIcon, Video, MessageSquare, ShieldCheck, ArrowLeft,
  GitFork, ScanSearch, Globe, Clock, AlertTriangle, ImagePlus,
} from "lucide-react";

const tabs = [
  { id: "link", label: "رابط منشور", Icon: Link2, ph: "ألصق رابط منشور من X أو إنستغرام أو غيرها…" },
  { id: "image", label: "لقطة شاشة", Icon: ImageIcon, ph: "ارفع لقطة شاشة للمنشور" },
  { id: "video", label: "فيديو قصير", Icon: Video, ph: "ألصق رابط الفيديو القصير" },
  { id: "msg", label: "رسالة متداولة", Icon: MessageSquare, ph: "ألصق نص الرسالة المتداولة" },
];

const Social = () => {
  const [tab, setTab] = useState("link");
  const active = tabs.find((t) => t.id === tab)!;

  return (
    <Layout>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="container py-20">
          <div className="chip mb-4"><span className="mono text-[11px] tracking-widest">SOCIAL · AGENT</span></div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">وكيل السوشال ميديا</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            وكيل متخصص للتحقق من المحتوى المتداول على المنصات الاجتماعية، يتتبع الأصل، يحلّل الانتشار، ويكشف مؤشرات التلاعب.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {[Twitter, Instagram, Music2, Facebook, MessageCircle, Send].map((I, i) => (
              <div key={i} className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <I className="h-5 w-5 text-foreground/80" />
              </div>
            ))}
            <span className="mono text-[11px] tracking-widest text-muted-foreground">X · INSTAGRAM · TIKTOK · FACEBOOK · WHATSAPP · TELEGRAM</span>
          </div>
        </div>
      </section>

      {/* TABBED INPUT */}
      <section className="container py-12">
        <div className="glass-panel p-6 md:p-8">
          <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-4">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition ${
                  tab === t.id ? "bg-primary/15 text-primary ring-1 ring-primary/30" : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                }`}
              >
                <t.Icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-background/40 px-4 py-3">
              <active.Icon className="h-4 w-4 text-muted-foreground" />
              <input placeholder={active.ph} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-primary to-primary/80 px-7 py-3 font-semibold text-primary-foreground signal-glow ring-1 ring-white/10 hover:brightness-110">
              <ShieldCheck className="h-4 w-4" /> تحقق الآن
            </button>
          </div>
        </div>
      </section>

      {/* RESULT MOCK */}
      <section className="container">
        <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
          <div className="glass-panel p-6">
            <div className="mono mb-2 text-[10px] tracking-widest text-muted-foreground">VERDICT</div>
            <VerdictBadge verdict="suspicious" />
            <div className="mt-6 grid place-items-center">
              <ConfidenceRing value={56} size={140} label="درجة الثقة" />
            </div>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              المنشور يحوي عناصر قابلة للتحقق وأخرى مفقودة المصدر. لا يُنصح بالاستناد إليه دون مراجعة المصدر الأصلي.
            </p>
            <div className="mt-6 space-y-2 border-t border-white/[0.06] pt-5 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">المنصة</span><span>X (تويتر)</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">إعادة النشر</span><span className="mono">14,302</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">أول ظهور</span><span>قبل 9 ساعات</span></div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              { Icon: Globe, title: "تتبع الأصل", v: "حساب جديد عمره 11 يومًا، مؤشر منخفض" },
              { Icon: GitFork, title: "انتشار إعادة النشر", v: "موجة منسّقة عبر 38 حسابًا متشابهًا" },
              { Icon: ScanSearch, title: "مؤشرات التلاعب", v: "تعديل بصري مرجّح في جزء من الصورة" },
              { Icon: ImagePlus, title: "محتوى مطابق", v: "إصدار سابق للحدث ظهر قبل سنة" },
            ].map((c, i) => (
              <div key={i} className="glass-panel p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                    <c.Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-bold">{c.title}</h4>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.v}</p>
              </div>
            ))}
            <div className="glass-panel md:col-span-2 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-bold">معاينة المنشور</h4>
                <span className="chip mono">@account_handle</span>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-background/50 p-4 text-sm leading-7 text-muted-foreground">
                "ادعاء متداول حول حدث جارٍ، يحتوي وسائط بصرية وعنوانًا لافتًا للنظر…"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THIS AGENT CHECKS */}
      <section className="container py-24">
        <SectionHeader eyebrow="ماذا يفحص هذا الوكيل" title="ست طبقات من الفحص" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { Icon: Globe, t: "تتبع الأصل" },
            { Icon: GitFork, t: "تحليل إعادة النشر" },
            { Icon: ScanSearch, t: "كشف الوسائط بالذكاء الاصطناعي" },
            { Icon: Link2, t: "مقارنة المصادر" },
            { Icon: Clock, t: "التحقق من التوقيت" },
            { Icon: AlertTriangle, t: "مؤشرات التلاعب" },
          ].map((c, i) => (
            <div key={i} className="glass-panel p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <c.Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </div>
              <h4 className="mt-4 text-base font-bold">{c.t}</h4>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">طبقة فحص دقيقة ضمن سلسلة التحقق المتكاملة لوكيل السوشال ميديا.</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                التفاصيل <ArrowLeft className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Social;
