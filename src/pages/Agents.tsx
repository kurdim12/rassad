import { Layout } from "@/components/rasad/Layout";
import { SectionHeader } from "@/components/rasad/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticles } from "@/hooks/useArticles";
import { GenerateButton, EmptyState } from "@/components/rasad/AdminGenerate";
import { Seo } from "@/components/seo/Seo";
import { Bot, ShieldCheck } from "lucide-react";

const Agents = () => {
  const { items, loading, generate } = useArticles("agent", 18);

  return (
    <Layout>
      <Seo title="منظومة الوكلاء | رصد" description="وكلاء متخصصون للتحقق من النص والصور والفيديو والصوت." path="/agents" />

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="container py-20">
          <div className="chip mb-4"><span className="mono text-[11px] tracking-widest">AGENTS · OS</span></div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">منظومة الوكلاء</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">شبكة متخصصة من الوكلاء تعمل بتناغم لتحويل الإشارات الخام إلى أحكام مدعومة بالأدلة.</p>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-6 flex items-center justify-between">
          <SectionHeader align="right" eyebrow="الوكلاء المتاحون" title="فريق رصد" />
          <GenerateButton onGenerate={generate} loading={loading} />
        </div>

        {loading && items.length === 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
          </div>
        ) : items.length === 0 ? (
          <EmptyState message="لا يوجد وكلاء معرّفون بعد." />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => (
              <article key={a.id} className="glass-panel p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-primary/10 text-primary">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold">{a.title}</h3>
                    {a.category && <span className="mono text-[11px] text-muted-foreground">{a.category}</span>}
                  </div>
                </div>
                {a.summary && <p className="mt-4 text-sm leading-7 text-muted-foreground">{a.summary}</p>}
                <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-verified" />
                  <span>وكيل نشط</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Agents;
