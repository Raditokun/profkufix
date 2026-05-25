import { chipBg, chipFg } from "@/lib/rating";

interface ScoreRowProps {
  icon: string;
  label: string;
  value: number;
}

export function ScoreRow({ icon, label, value }: ScoreRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr 90px",
        gap: 14,
        alignItems: "center",
        background: "var(--pk-rose-tint)",
        borderRadius: 10,
        height: 64,
        paddingRight: 8,
      }}
    >
      <div
        aria-hidden
        style={{
          width: 64,
          height: 64,
          background: `url('${icon}') center / cover no-repeat`,
          borderRadius: "10px 0 0 10px",
        }}
      />
      <span
        style={{
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 22,
          color: "var(--pk-ink)",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </span>
      <div
        style={{
          justifySelf: "end",
          width: 90,
          height: 46,
          background: chipBg(value),
          color: chipFg(value),
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 400,
          fontSize: 32,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value.toFixed(1)}
      </div>
    </div>
  );
}

export function ScoreList({
  items,
  title,
}: {
  items: { icon: string; label: string; value: number }[];
  title?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {title && (
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 800,
            fontSize: 28,
            color: "var(--pk-ink)",
          }}
        >
          {title}
        </h3>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        {items.map((it) => (
          <ScoreRow key={it.label} {...it} />
        ))}
      </div>
    </div>
  );
}
