import { ExternalLink, BookOpen } from "lucide-react";

type Source = { title: string; note?: string; url?: string };

export const WebSourcesPanel = ({ sources }: { sources: Source[] }) => {
  if (!sources?.length) return null;

  return (
    <div className="rounded-xl border border-border/50 bg-background/30 p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-bold">المصادر والمراجع</h4>
        <span className="mono ms-auto text-[11px] text-muted-foreground">{sources.length}</span>
      </div>
      <ul className="space-y-2">
        {sources.map((s, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-card/40 p-3 text-sm"
          >
            <span className="mono mt-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/15 px-1.5 text-[10px] font-bold text-primary">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold hover:text-primary"
                >
                  {s.title} <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="font-semibold">{s.title}</span>
              )}
              {s.note && <p className="mt-0.5 text-xs text-muted-foreground">{s.note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
