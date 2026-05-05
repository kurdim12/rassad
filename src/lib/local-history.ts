// localStorage history for guest verifications (max 20)
export type GuestVerification = {
  id: string;
  input_text: string;
  input_url: string | null;
  image_url: string | null;
  kind: "text" | "url" | "image";
  verdict: string;
  confidence: number;
  explanation: string;
  sources: Array<{ title: string; note?: string }>;
  model?: string;
  created_at: string;
};

const KEY = "rasad_history";
const MAX = 20;

export const getHistory = (): GuestVerification[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

export const addToHistory = (entry: GuestVerification) => {
  const list = getHistory();
  const next = [entry, ...list.filter((e) => e.id !== entry.id)].slice(0, MAX);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* quota — ignore */
  }
  return next;
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
};
