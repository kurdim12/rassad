import type { GuestVerification } from "./local-history";

const verdictArabic = (v: string) => {
  const map: Record<string, string> = {
    trusted: "موثوق",
    verified: "موثوق",
    suspicious: "مشبوه",
    fake: "كاذب",
    uncertain: "غير مؤكَّد",
    misleading: "مضلِّل",
  };
  return map[v.toLowerCase()] ?? v;
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportAsJSON = (v: GuestVerification) => {
  const blob = new Blob([JSON.stringify(v, null, 2)], { type: "application/json" });
  downloadBlob(blob, `rasad-verdict-${v.id.slice(0, 8)}.json`);
};

export const exportAsCSV = (v: GuestVerification) => {
  const rows = [
    ["id", "kind", "verdict", "confidence", "input", "url", "explanation", "created_at"],
    [
      v.id,
      v.kind,
      v.verdict,
      String(v.confidence),
      v.input_text ?? "",
      v.input_url ?? "",
      (v.explanation ?? "").replace(/\s+/g, " "),
      v.created_at,
    ],
  ];
  const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const csv = rows.map((r) => r.map(escape).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, `rasad-verdict-${v.id.slice(0, 8)}.csv`);
};

export const exportListAsCSV = (list: GuestVerification[]) => {
  const header = ["id", "kind", "verdict", "confidence", "input", "url", "created_at"];
  const escape = (s: string) => `"${(s ?? "").replace(/"/g, '""')}"`;
  const rows = list.map((v) =>
    [v.id, v.kind, v.verdict, String(v.confidence), v.input_text ?? "", v.input_url ?? "", v.created_at]
      .map(escape)
      .join(","),
  );
  const csv = [header.join(","), ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, `rasad-history-${Date.now()}.csv`);
};

export const buildShareableText = (v: GuestVerification): string => {
  const lines = [
    `🛡️ تقرير تحقق — رصد`,
    ``,
    `الحكم: ${verdictArabic(v.verdict)}`,
    `الثقة: ${v.confidence}%`,
    ``,
    `المُدخَل: ${v.input_text || v.input_url || "[صورة]"}`,
    ``,
    `التفسير:`,
    v.explanation || "—",
  ];
  if (v.sources?.length) {
    lines.push("", "المصادر:");
    v.sources.slice(0, 5).forEach((s, i) => {
      lines.push(`${i + 1}. ${s.title}${s.note ? ` — ${s.note}` : ""}`);
    });
  }
  lines.push("", "rassad.info");
  return lines.join("\n");
};

export const copyShareableText = async (v: GuestVerification) => {
  await navigator.clipboard.writeText(buildShareableText(v));
};
