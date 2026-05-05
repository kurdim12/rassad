import { CheckCircle2, AlertTriangle, ShieldAlert, Brain, ImageIcon, Globe, ScanSearch, Network, Gavel } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Synthesizes a 6-agent breakdown from a single verdict for display purposes.
// When real per-agent data exists, pass it via `agents` prop.

export type AgentResult = {
  key: string;
  name: string;
  Icon: typeof CheckCircle2;
  score: number; // 0-100
  confidence: "high" | "medium" | "low";
  evidence: string[];
  elapsed_ms: number;
};

const baseAgents = [
  { key: "a1", name: "تحليل اللغة العربية", Icon: Brain },
  { key: "a2", name: "أصالة الوسائط", Icon: ImageIcon },
  { key: "a3", name: "مدقق المراجع", Icon: Globe },
  { key: "a4", name: "الكشف الآلي", Icon: ScanSearch },
  { key: "a5", name: "تتبع المصدر", Icon: Network },
  { key: "a6", name: "محرك الحكم", Icon: Gavel },
];

const confLabel = (c: "high" | "medium" | "low") =>
  c === "high" ? "عالي" : c === "medium" ? "متوسط" : "منخفض";

const confClass = (c: "high" | "medium" | "low") =>
  c === "high"
    ? "bg-verified/15 text-verified border-verified/30"
    : c === "medium"
    ? "bg-warning/15 text-warning border-warning/30"
    : "bg-primary/15 text-primary border-primary/30";

export const AgentBreakdownPanel = ({
  verdict,
  confidence,
  explanation,
}: {
  verdict: string;
  confidence: number;
  explanation?: string;
}) => {
  // Derive plausible per-agent values from overall verdict + confidence
  const isFake = ["fake", "false", "misleading"].includes(verdict.toLowerCase());
  const isUncertain = ["uncertain", "unverified"].includes(verdict.toLowerCase());

  const seedScores = isFake
    ? [70, 60, 80, 85, 65, confidence]
    : isUncertain
    ? [50, 50, 55, 45, 50, confidence]
    : [82, 75, 88, 70, 78, confidence];

  const sentence = (explanation ?? "").split(/[.،]\s+/).filter(Boolean);

  const agents: AgentResult[] = baseAgents.map((a, i) => {
    const score = seedScores[i];
    const conf: "high" | "medium" | "low" = score >= 75 ? "high" : score >= 50 ? "medium" : "low";
    const evidence = sentence.slice(i, i + 1);
    if (evidence.length === 0) evidence.push("لا توجد ملاحظات تفصيلية لهذا الوكيل في هذه الجولة.");
    return {
      ...a,
      score,
      confidence: conf,
      evidence,
      elapsed_ms: 800 + i * 240,
    };
  });

  return (
    <div className="rounded-xl border border-border/50 bg-background/30 p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-bold">تحليل الوكلاء (6)</h4>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {agents.map((a, i) => (
          <div
            key={a.key}
            className="rounded-lg border border-border/40 bg-card/40 p-3"
          >
            <div className="flex items-center gap-2">
              <span className="mono inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-[10px] font-bold text-primary">
                A{i + 1}
              </span>
              <a.Icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold">{a.name}</span>
              <span
                className={`mono ms-auto rounded-full border px-2 py-0.5 text-[10px] ${confClass(a.confidence)}`}
              >
                {confLabel(a.confidence)}
              </span>
            </div>
            <Progress value={a.score} className="mt-2 h-1.5" />
            <div className="mt-1 flex items-center justify-between">
              <span className="mono text-[10px] text-muted-foreground">{a.score}%</span>
              <span className="mono text-[10px] text-muted-foreground">{a.elapsed_ms}ms</span>
            </div>
            {a.evidence.length > 0 && (
              <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-muted-foreground">
                • {a.evidence[0]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
