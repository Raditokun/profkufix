"use client";

import { useState } from "react";

export type TagTone = "good" | "warn" | "bad" | "neutral" | "info";

export interface Tag {
  label: string;
  tone?: TagTone;
}

const TAG_PALETTE: Record<TagTone, string> = {
  good: "var(--pk-good)",
  warn: "var(--pk-warn)",
  bad: "var(--pk-bad-strong)",
  neutral: "var(--pk-rose-600)",
  info: "var(--pk-primary)",
};

export function PersonalityTags({
  tags,
  selectable = false,
  initial = [],
  onChange,
  max = 3,
}: {
  tags: Tag[];
  selectable?: boolean;
  initial?: string[];
  onChange?: (picked: string[]) => void;
  max?: number;
}) {
  const [picked, setPicked] = useState<Set<string>>(new Set(initial));

  const toggle = (label: string) => {
    if (!selectable) return;
    const next = new Set(picked);
    if (next.has(label)) {
      next.delete(label);
    } else {
      if (next.size >= max) return;
      next.add(label);
    }
    setPicked(next);
    onChange?.([...next]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: "center",
      }}
    >
      {tags.map((t) => {
        const active = picked.has(t.label);
        const tone = t.tone ?? "neutral";
        const bg = TAG_PALETTE[tone];
        const fg = tone === "warn" ? "var(--pk-ink)" : "var(--pk-paper)";
        const limitReached = selectable && picked.size >= max && !active;
        return (
          <button
            key={t.label}
            type="button"
            onClick={() => toggle(t.label)}
            disabled={limitReached}
            style={{
              border:
                selectable && active
                  ? "3px solid var(--pk-ink)"
                  : "0 solid transparent",
              height: 35,
              padding: "0 22px",
              borderRadius: 19,
              background: bg,
              color: fg,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 700,
              fontSize: 18,
              cursor: selectable
                ? limitReached
                  ? "not-allowed"
                  : "pointer"
                : "default",
              lineHeight: 1,
              opacity: limitReached ? 0.4 : 1,
              transition:
                "opacity 180ms var(--pk-ease), transform 120ms var(--pk-ease)",
              whiteSpace: "nowrap",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

// Compact, non-interactive tag for review-card listings
export function MutedTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: "5px 14px",
        borderRadius: 9999,
        background: "var(--pk-rose-tint)",
        color: "var(--pk-ink)",
        fontFamily: "var(--pk-font-ui)",
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
