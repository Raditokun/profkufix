import { formatDistanceToNow } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { chipBg, chipFg } from "@/lib/rating";
import { MutedTag } from "./personality-tags";

interface ReviewCardProps {
  id: string;
  body: string;
  rating: number;
  difficulty: number;
  wouldTakeAgain: boolean | null;
  courseNameRaw: string | null;
  gradeReceived: string | null;
  semester: string | null;
  tags: string[] | null;
  createdAt: string;
  authorAlias: string | null;
  thumbsUp: number | null;
}

export function ReviewCard({
  body,
  rating,
  difficulty,
  wouldTakeAgain,
  courseNameRaw,
  gradeReceived,
  semester,
  tags,
  createdAt,
  authorAlias,
}: ReviewCardProps) {
  const relativeDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: idLocale,
  });
  const code =
    courseNameRaw
      ?.toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8) || "MK";

  return (
    <article
      style={{
        background: "var(--pk-paper)",
        border: "1px solid var(--pk-line)",
        borderRadius: 24,
        padding: "24px 28px",
        display: "grid",
        gridTemplateColumns: "130px 1fr",
        gap: 28,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 130,
            height: 100,
            borderRadius: 14,
            background: chipBg(rating),
            color: chipFg(rating),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 400,
            fontSize: 56,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {rating.toFixed(1)}
        </div>
        <span
          style={{
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 700,
            fontSize: 12,
            color: "var(--pk-fg-3)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Quality
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--pk-font-mono)",
              fontWeight: 700,
              fontSize: 16,
              color: "var(--pk-primary)",
              letterSpacing: "0.05em",
            }}
          >
            {code}
          </span>
          <span
            style={{
              fontFamily: "var(--pk-font-ui)",
              fontSize: 14,
              color: "var(--pk-fg-3)",
            }}
          >
            Difficulty {difficulty} · {relativeDate}
            {semester ? ` · ${semester}` : ""}
            {gradeReceived ? ` · Nilai ${gradeReceived}` : ""}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--pk-font-ui)",
              fontSize: 14,
              color: "var(--pk-fg-3)",
            }}
          >
            {authorAlias || "Anonim"}
          </span>
        </div>

        {wouldTakeAgain !== null && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 8,
              padding: "4px 12px",
              borderRadius: 9999,
              background: wouldTakeAgain
                ? "var(--pk-good-soft)"
                : "var(--pk-bad-soft)",
              color: wouldTakeAgain ? "#0a6b0a" : "var(--pk-bad-strong)",
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.02em",
            }}
          >
            {wouldTakeAgain
              ? "Mau Diajar Beliau Lagi"
              : "Tidak Mau Lagi"}
          </div>
        )}

        <p
          style={{
            margin: 0,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 500,
            fontSize: 17,
            color: "var(--pk-ink)",
            lineHeight: 1.5,
          }}
        >
          {body}
        </p>
        {tags && tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map((t) => (
              <MutedTag key={t}>{t}</MutedTag>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
