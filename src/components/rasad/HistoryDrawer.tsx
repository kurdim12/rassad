import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, Trash2, Download } from "lucide-react";
import { VerdictBadge } from "@/components/rasad/Badge";
import { ConfidenceRing } from "@/components/rasad/ConfidenceRing";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import type { GuestVerification } from "@/lib/local-history";
import { exportListAsCSV } from "@/lib/export-verdict";

type Props = {
  history: GuestVerification[];
  onClear: () => void;
  onSelect?: (v: GuestVerification) => void;
};

export const HistoryDrawer = ({ history, onClear, onSelect }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <HistoryIcon className="h-3.5 w-3.5" />
          السجل
          {history.length > 0 && (
            <span className="mono rounded-full bg-primary/20 px-1.5 text-[10px] text-primary">
              {history.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center justify-between">
            <span>السجل المحلي ({history.length})</span>
            <span className="flex items-center gap-2">
              {history.length > 0 && (
                <>
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={() => exportListAsCSV(history)}>
                    <Download className="h-3.5 w-3.5" /> CSV
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={onClear}>
                    <Trash2 className="h-3.5 w-3.5" /> مسح الكل
                  </Button>
                </>
              )}
            </span>
          </SheetTitle>
        </SheetHeader>

        {history.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border/40 p-10 text-center text-sm text-muted-foreground">
            لا يوجد سجل بعد. كل عملية تحقق تُحفظ تلقائياً على هذا المتصفح (آخر 20).
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {history.map((h) => (
              <button
                key={h.id}
                onClick={() => onSelect?.(h)}
                className="rounded-lg border border-border/50 bg-card/40 p-3 text-start transition hover:border-primary/40"
              >
                <div className="flex items-start gap-3">
                  <ConfidenceRing value={h.confidence} size={48} />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      <VerdictBadge verdict={h.verdict === "uncertain" ? "suspicious" : (h.verdict as never)} />
                      <span className="mono text-[10px] text-muted-foreground">{h.kind.toUpperCase()}</span>
                      <span className="mono text-[10px] text-muted-foreground">
                        {formatDistanceToNow(new Date(h.created_at), { addSuffix: true, locale: ar })}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-xs">{h.input_text || h.input_url || "[صورة]"}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
