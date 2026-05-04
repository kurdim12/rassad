import { useState } from "react";
import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { Breadcrumbs } from "@/components/rasad/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import { Link } from "react-router-dom";
import { Check, X, ArrowLeft, Award } from "lucide-react";

const TIERS = [
  {
    name: "مجاني",
    monthly: 0,
    yearly: 0,
    desc: "للأفراد والاستخدام الخفيف.",
    features: ["20 عملية تحقق شهرياً", "نص + صورة فقط", "تقارير أساسية", "دعم عبر البريد"],
    cta: "ابدأ مجاناً",
    to: "/signup",
    highlight: false,
  },
  {
    name: "احترافي",
    monthly: 29,
    yearly: 23,
    desc: "للصحفيين والمؤسسات المتوسطة.",
    features: ["تحقق غير محدود", "كل أنواع المحتوى", "تصدير PDF و CSV", "وصول للـ API", "دعم ذو أولوية"],
    cta: "اشترك الآن",
    to: "/signup",
    highlight: true,
  },
  {
    name: "مؤسسي",
    monthly: null,
    yearly: null,
    desc: "للمنظمات الكبرى والجهات الحكومية.",
    features: ["كل ما في الاحترافي", "تكامل SSO/SAML", "SLA مضمون 99.9%", "مدير حساب مخصّص", "تدريب الفريق"],
    cta: "تحدّث مع المبيعات",
    to: "/contact",
    highlight: false,
  },
];

const COMPARE = [
  { f: "عمليات تحقق شهرياً", v: ["20", "غير محدود", "حسب الحاجة"] },
  { f: "نص ورابط", v: [true, true, true] },
  { f: "صور", v: [true, true, true] },
  { f: "فيديو وصوت", v: [false, true, true] },
  { f: "تصدير PDF / CSV", v: [false, true, true] },
  { f: "وصول للـ API", v: [false, true, true] },
  { f: "تكامل SSO / SAML", v: [false, false, true] },
  { f: "SLA مضمون", v: [false, false, true] },
  { f: "مدير حساب مخصّص", v: [false, false, true] },
  { f: "تدريب الفريق", v: [false, false, true] },
];

const Pricing = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <Layout>
      <Seo
        title="الأسعار | رصد — باقات مرنة لكل احتياج"
        description="باقات رصد: مجاني للأفراد، احترافي للصحفيين والمؤسسات، ومؤسسي للجهات الكبرى. ابدأ بدون بطاقة بنكية."
        path="/pricing"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "الأسعار", path: "/pricing" }])} />
      <Breadcrumbs items={[{ name: "الأسعار" }]} />

      <section className="container py-12 md:py-16">
        <SectionHeader
          eyebrow="الأسعار"
          title="باقات شفافة، بلا التزامات خفيّة"
          subtitle="ابدأ مجاناً وارقَ متى احتجت — يمكنك الإلغاء في أي وقت."
        />

        <div className="mb-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              billing === "monthly" ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            شهري
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${
              billing === "yearly" ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            سنوي
            <span className="rounded-full bg-verified/20 px-2 py-0.5 text-[10px] font-bold text-verified">وفّر 20%</span>
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((p, i) => {
            const price = billing === "monthly" ? p.monthly : p.yearly;
            return (
              <div
                key={i}
                className={`glass-panel relative flex flex-col p-7 ${
                  p.highlight ? "border-primary/40 ring-1 ring-primary/30" : ""
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 start-7 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground signal-glow">
                    <Award className="h-3 w-3" /> الأكثر شيوعاً
                  </div>
                )}
                <div className="text-sm font-bold text-muted-foreground">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="display text-5xl font-extrabold text-foreground">
                    {price === null ? "—" : `$${price}`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {price === null ? "تواصل معنا" : billing === "monthly" ? "/شهر" : "/شهر · سنوي"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={p.to}
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-bold transition ${
                    p.highlight
                      ? "bg-gradient-to-b from-primary to-primary/80 text-primary-foreground signal-glow ring-1 ring-white/10 hover:brightness-110"
                      : "border border-white/[0.08] bg-white/[0.03] text-foreground hover:bg-white/[0.06]"
                  }`}
                  style={{ minHeight: 48 }}
                >
                  {p.cta} <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMPARE TABLE */}
      <section className="container py-16">
        <SectionHeader eyebrow="المقارنة الكاملة" title="ماذا تتضمّن كل باقة؟" />

        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="p-4 text-start font-bold text-foreground">الميزة</th>
                  {TIERS.map((t) => (
                    <th key={t.name} className="p-4 text-center font-bold text-foreground">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.04] last:border-0">
                    <td className="p-4 text-muted-foreground">{row.f}</td>
                    {row.v.map((cell, j) => (
                      <td key={j} className="p-4 text-center">
                        {typeof cell === "boolean" ? (
                          cell ? (
                            <Check className="mx-auto h-5 w-5 text-verified" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                          )
                        ) : (
                          <span className="text-foreground">{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
