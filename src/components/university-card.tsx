import Link from "next/link";
import { MutedTag } from "./personality-tags";

interface UniversityCardProps {
  name: string;
  shortName: string;
  city: string | null;
  slug: string;
  facultyCount: number;
  logoUrl?: string | null;
  avgRating?: number | null;
}

export function UniversityCard({
  name,
  shortName,
  city,
  slug,
  facultyCount,
  logoUrl,
  avgRating,
}: UniversityCardProps) {
  const logo = logoUrl || "/profku/img/uni-logo-its.png";
  const hasRating = avgRating != null && !isNaN(avgRating);

  return (
    <Link
      href={`/universitas/${slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        className="pk-result-row"
        style={{
          display: "grid",
          gridTemplateColumns: "96px 1fr 110px",
          gap: 20,
          alignItems: "center",
          background: "var(--pk-paper)",
          border: "1px solid var(--pk-line)",
          borderRadius: 20,
          padding: 18,
          cursor: "pointer",
          transition:
            "transform 180ms var(--pk-ease), box-shadow 180ms var(--pk-ease)",
        }}
      >
        <div
          aria-hidden
          style={{
            width: 96,
            height: 96,
            borderRadius: 16,
            background: `url('${logo}') center / contain no-repeat var(--pk-cream)`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 800,
              fontSize: 22,
              color: "var(--pk-ink)",
              lineHeight: 1.15,
            }}
          >
            {name}
          </h3>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 500,
              fontSize: 14,
              color: "var(--pk-fg-3)",
            }}
          >
            {city || "Indonesia"} · {facultyCount} Fakultas
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
            <MutedTag>{shortName}</MutedTag>
          </div>
        </div>
        <div
          style={{
            justifySelf: "end",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {hasRating ? (
            <div
              style={{
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 800,
                fontSize: 40,
                color: "var(--pk-ink)",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {avgRating!.toFixed(1)}
            </div>
          ) : (
            <div
              style={{
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 700,
                fontSize: 28,
                color: "var(--pk-fg-4)",
                lineHeight: 1,
              }}
            >
              --
            </div>
          )}
          <span
            style={{
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 700,
              fontSize: 11,
              color: "var(--pk-fg-3)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Rating
          </span>
        </div>
      </div>
    </Link>
  );
}

// Small inline list-item used in landing "List Tempat Tinggal"
export function UniListItem({
  name,
  slug,
  logoUrl,
}: {
  name: string;
  slug: string;
  logoUrl?: string | null;
}) {
  const logo = logoUrl || "/profku/img/uni-logo-its.png";
  return (
    <Link
      href={`/universitas/${slug}`}
      className="pk-list-item"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "6px 10px",
        borderRadius: 12,
        transition: "background 180ms var(--pk-ease)",
        textDecoration: "none",
      }}
    >
      <div
        aria-hidden
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: `url('${logo}') center / contain no-repeat var(--pk-cream-soft)`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 20,
          color: "var(--pk-ink)",
        }}
      >
        {name}
      </span>
    </Link>
  );
}
