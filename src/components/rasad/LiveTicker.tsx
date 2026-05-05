import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, RefreshCw, Pause, Play, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Link } from "react-router-dom";

type Article = {
  id: string;
  title: string;
  summary: string | null;
  source_url: string | null;
  verdict: string | null;
  confidence: number | null;
  category: string | null;
  published_at: string;
};

const riskMeta = (verdict: string | null) => {
  const k = (verdict ?? "").toLowerCase();
  if (["trusted", "verified"].includes(k))
    return { label: "موثوق", cls: "bg-verified/15 text-verified border-verified/30", value: "verified" };
  if (["fake", "false"].includes(k))
    return { label: "خطر", cls: "bg-primary/15 text-primary border-primary/30 animate-pulse", value: "risky" };
  if (["suspicious", "misleading"].includes(k))
    return { label: "مشبوه", cls: "bg-warning/15 text-warning border-warning/30", value: "suspicious" };
  return { label: "محايد", cls: "bg-muted/30 text-muted-foreground border-border/50", value: "neutral" };
};

const domainOf = (url: string | null) => {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const fetchArticles = async (limit: number): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("id,title,summary,source_url,verdict,confidence,category,published_at")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Article[];
};

type Props = {
  variant?: "compact" | "full";
  limit?: number;
  riskFilter?: "" | "verified" | "suspicious" | "risky" | "neutral";
};

export const LiveTicker = ({ variant = "compact", limit = 5, riskFilter = "" }: Props) => {
  const [polling, setPolling] = useState(true);

  const q = useQuery({
    queryKey: ["live-articles", limit],
    queryFn: () => fetchArticles(variant === "compact" ? limit : 24),
    refetchInterval: polling ? 12_000 : false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (q.error) console.error("LiveTicker error", q.error);
  }, [q.error]);

  const items = (q.data ?? []).filter((a) => {
    if (!riskFilter) return true;
    return riskMeta(a.verdict).value === riskFilter;
  });

  const Header = (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="relative inline-flex h-2.5 w-2.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
        </span>
        <span className="mono text-xs uppercase tracking-widest text-primary">مباشر</span>
        <span className="mono text-[10px] text-muted-foreground">
          {q.dataUpdatedAt ? formatDistanceToNow(q.dataUpdatedAt, { addSuffix: true, locale: ar }) : "—"}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setPolling((p) => !p)}
          title={polling ? "إيقاف التحديث" : "استئناف التحديث"}
        >
          {polling ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => q.refetch()}
          disabled={q.isFetching}
          title="تحديث"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${q.isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </div>
  );

  const ItemCard = ({ a }: { a: Article }) => {
    const r = riskMeta(a.verdict);
    return (
      <article className="rounded-lg border border-border/40 bg-card/40 p-3 transition hover:border-primary/40">
        <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
          <span className={`mono rounded-full border px-2 py-0.5 text-[10px] ${r.cls}`}>{r.label}</span>
          {a.category && <span className="mono text-[10px] text-muted-foreground">{a.category}</span>}
          <span className="mono ms-auto text-[10px] text-muted-foreground">
            {formatDistanceToNow(new Date(a.published_at), { addSuffix: true, locale: ar })}
          </span>
        </div>
        <h4 className="line-clamp-2 text-sm font-bold leading-6">{a.title}</h4>
        {a.summary && (
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{a.summary}</p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="mono text-[10px] text-muted-foreground">{domainOf(a.source_url)}</span>
          {a.source_url && (
            <a
              href={a.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
            >
              المصدر <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </article>
    );
  };

  if (variant === "compact") {
    return (
      <div className="glass-panel p-4 sm:p-5">
        {Header}
        <div className="mt-4 space-y-2.5">
          {q.isLoading ? (
            <div className="text-sm text-muted-foreground">جارٍ التحميل...</div>
          ) : items.length === 0 ? (
            <div className="text-sm text-muted-foreground">لا توجد عناصر حالياً.</div>
          ) : (
            items.slice(0, limit).map((a) => <ItemCard key={a.id} a={a} />)
          )}
        </div>
        <div className="mt-3 flex justify-end border-t border-border/40 pt-3">
          <Link to="/live" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
            <Radio className="h-3 w-3" /> فتح البث المباشر الكامل
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {Header}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {q.isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-lg border border-border/30 bg-card/30" />
            ))
          : items.length === 0
          ? (
              <div className="col-span-full rounded-lg border border-dashed border-border/40 p-10 text-center text-sm text-muted-foreground">
                لا توجد عناصر مطابقة للفلتر الحالي.
              </div>
            )
          : items.map((a) => <ItemCard key={a.id} a={a} />)}
      </div>
    </div>
  );
};
