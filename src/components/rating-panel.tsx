import { RATE_COLORS } from "@/lib/rating";

interface RatingPanelProps {
  counts: number[]; // length 5, index 0 = 1-star
  title?: string;
}

export function RatingPanel({
  counts,
  title = "Distribusi Rating",
}: RatingPanelProps) {
  const total = counts.reduce((a, b) => a + b, 0) || 1;
  return (
    <div
      style={{
        background: "var(--pk-rose-500)",
        borderRadius: 40,
        padding: "32px 40px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 800,
            fontSize: 26,
            color: "var(--pk-paper)",
            whiteSpace: "nowrap",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 500,
            fontSize: 14,
            color: "var(--pk-paper)",
            opacity: 0.8,
          }}
        >
          {total.toLocaleString("id-ID")} mahasiswa
        </span>
      </div>

      {[5, 4, 3, 2, 1].map((n) => {
        const pct = (counts[n - 1] / total) * 100;
        return (
          <div
            key={n}
            style={{
              display: "grid",
              gridTemplateColumns: "70px 1fr 60px",
              gap: 14,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: RATE_COLORS[n - 1],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 400,
                fontSize: 40,
                color: n === 5 ? "#FFF" : "var(--pk-ink)",
              }}
            >
              {n}
            </div>
            <div
              style={{
                height: 64,
                background: "var(--pk-paper)",
                borderRadius: 50,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${Math.max(pct, 6)}%`,
                  height: "100%",
                  background: "var(--pk-info)",
                  borderRadius: 50,
                  transition: "width 500ms var(--pk-ease)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 700,
                fontSize: 16,
                color: "var(--pk-paper)",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {pct.toFixed(0)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
