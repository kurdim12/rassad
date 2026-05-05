import { useState } from "react";
import { Layout } from "@/components/rasad/Layout";
import { Seo } from "@/components/seo/Seo";
import { LiveTicker } from "@/components/rasad/LiveTicker";
import { Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

type Risk = "" | "verified" | "suspicious" | "risky" | "neutral";

const filters: Array<{ key: Risk; label: string }> = [
  { key: "", label: "الكل" },
  { key: "verified", label: "موثوق" },
  { key: "suspicious", label: "مشبوه" },
  { key: "risky", label: "خطر" },
  { key: "neutral", label: "محايد" },
];

const Live = () => {
  const [risk, setRisk] = useState<Risk>("");

  return (
    <Layout>
      <Seo
        title="البث المباشر | رصد"
        description="البث المباشر للأخبار والادعاءات المتداولة مع تصنيف المخاطر اللحظي من رصد."
        path="/live"
      />

      <section className="container py-12 md:py-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="chip mb-3">
              <Radio className="h-3.5 w-3.5 text-primary" />
              <span className="text-[12px]">تحديث كل 12 ثانية</span>
            </div>
            <h1 className="text-3xl font-extrabold md:text-4xl">البث المباشر</h1>
            <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
              تتبع لحظي لأبرز الأخبار والادعاءات المتداولة، مصنّفة بحسب درجة الخطر.
            </p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f.key || "all"}
              size="sm"
              variant={risk === f.key ? "default" : "outline"}
              onClick={() => setRisk(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        <LiveTicker variant="full" riskFilter={risk} />
      </section>
    </Layout>
  );
};

export default Live;
