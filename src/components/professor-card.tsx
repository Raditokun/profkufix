import Link from "next/link";
import { chipBg, chipFg } from "@/lib/rating";
import { MutedTag } from "./personality-tags";

interface Department {
  name: string;
  faculties: {
    universities: {
      name: string;
      short_name: string | null;
      city: string | null;
    } | null;
  } | null;
}

interface ProfessorCardProps {
  id: string;
  fullName: string;
  title: string | null;
  department: Department | null;
  avgRating: number | null;
  reviewCount: number | null;
}

export function ProfessorCard({
  id,
  fullName,
  title,
  department,
  avgRating,
  reviewCount,
}: ProfessorCardProps) {
  const uni = department?.faculties?.universities;
  const value = avgRating ?? 0;
  const hasRating = avgRating != null && !isNaN(avgRating);
  const displayName = title ? `${fullName}, ${title}` : fullName;

  return (
    <Link
      href={`/dosen/${id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        className="pk-result-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: 28,
          alignItems: "center",
          background: "var(--pk-paper)",
          border: "1px solid var(--pk-line)",
          borderRadius: 20,
          padding: 22,
          cursor: "pointer",
          transition:
            "transform 180ms var(--pk-ease), box-shadow 180ms var(--pk-ease)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 800,
              fontSize: 26,
              color: "var(--pk-ink)",
              lineHeight: 1.1,
            }}
          >
            {displayName}
          </h3>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 500,
              fontSize: 15,
              color: "var(--pk-fg-3)",
              lineHeight: 1.4,
            }}
          >
            {department?.name && <>Dosen {department.name}</>}
            {uni?.name && (
              <>
                {department?.name ? " · " : ""}
                {uni.name}
                {uni.city ? ` (${uni.city})` : ""}
              </>
            )}
          </p>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 4,
              flexWrap: "wrap",
            }}
          >
            <MutedTag>{(reviewCount ?? 0).toLocaleString("id-ID")} ulasan</MutedTag>
            {uni?.short_name && <MutedTag>{uni.short_name}</MutedTag>}
          </div>
        </div>
        <div
          style={{
            justifySelf: "end",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 132,
              height: 90,
              borderRadius: 14,
              background: hasRating ? chipBg(value) : "var(--pk-rose-tint)",
              color: hasRating ? chipFg(value) : "var(--pk-fg-3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 800,
              fontSize: 56,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {hasRating ? value.toFixed(1) : "--"}
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
            Rating Rata-Rata
          </span>
        </div>
      </div>
    </Link>
  );
}
