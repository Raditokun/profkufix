export function chipBg(v: number): string {
  if (v >= 4) return "var(--pk-good)";
  if (v >= 3) return "var(--pk-lime)";
  if (v >= 2) return "var(--pk-warn)";
  if (v >= 1.5) return "var(--pk-orange)";
  return "var(--pk-bad)";
}

export function chipFg(v: number): string {
  return v < 2 ? "#FFFFFF" : "var(--pk-ink)";
}

export const RATE_COLORS = [
  "var(--pk-rate-1)",
  "var(--pk-rate-2)",
  "var(--pk-rate-3)",
  "var(--pk-rate-4)",
  "var(--pk-rate-5)",
];

export interface RatingTone {
  chip: string;
  pill: string;
  bar: string;
  text: string;
}

export function ratingTone(v: number): RatingTone {
  if (v >= 4) {
    return {
      chip: "bg-emerald-500 text-white",
      pill: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
      bar: "bg-emerald-500",
      text: "text-emerald-600",
    };
  }
  if (v >= 3) {
    return {
      chip: "bg-amber-400 text-slate-900",
      pill: "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200",
      bar: "bg-amber-400",
      text: "text-amber-600",
    };
  }
  return {
    chip: "bg-rose-500 text-white",
    pill: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
    bar: "bg-rose-500",
    text: "text-rose-600",
  };
}
