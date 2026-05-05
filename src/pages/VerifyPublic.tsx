import { Layout } from "@/components/rasad/Layout";
import { Seo } from "@/components/seo/Seo";
import { PublicVerify } from "@/components/rasad/PublicVerify";
import { ShieldCheck } from "lucide-react";

const VerifyPublic = () => {
  return (
    <Layout>
      <Seo
        title="تحقّق فوري | رصد"
        description="تحقّق من نص أو رابط أو صورة في ثوانٍ معدودة عبر منصة رصد — مجاناً وبدون تسجيل."
        path="/verify"
      />

      <section className="container py-12 md:py-16">
        <div className="mb-8 max-w-2xl">
          <div className="chip mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-[12px]">تحقّق مجاني — بدون تسجيل</span>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
            تحقّق من أي محتوى في <span className="text-primary">ثوانٍ معدودة</span>
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
            ألصق نصاً أو رابطاً أو ارفع صورة. ستحصل على حكم بدرجة ثقة، تفسير عربي، تفصيل لتحليل الوكلاء، والمصادر —
            وكل ذلك دون الحاجة لإنشاء حساب.
          </p>
        </div>

        <PublicVerify />
      </section>
    </Layout>
  );
};

export default VerifyPublic;
