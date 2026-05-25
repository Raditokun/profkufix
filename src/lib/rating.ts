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
