import { CheckCircle2, AlertTriangle, XOctagon } from "lucide-react";

export type Verdict = "trusted" | "suspicious" | "fake";

const map = {
  trusted: { label: "موثوق", Icon: CheckCircle2, cls: "text-verified border-verified/30 bg-verified/10" },
  suspicious: { label: "مشكوك فيه", Icon: AlertTriangle, cls: "text-warning border-warning/30 bg-warning/10" },
  fake: { label: "مزيف", Icon: XOctagon, cls: "text-primary border-primary/30 bg-primary/10" },
} as const;

export const VerdictBadge = ({ verdict, className = "" }: { verdict: Verdict; className?: string }) => {
  const { label, Icon, cls } = map[verdict];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cls} ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
};
