interface StatsBarProps {
  universityCount: number;
  professorCount: number;
  reviewCount: number;
}

export function StatsBar({
  universityCount,
  professorCount,
  reviewCount,
}: StatsBarProps) {
  const stats = [
    { value: universityCount, label: "Universitas" },
    { value: professorCount, label: "Dosen Terdaftar" },
    { value: reviewCount, label: "Ulasan Mahasiswa" },
    { value: "4.2", label: "Rating Rata-rata", isRaw: true },
  ];

  return (
    <section
      style={{
        background: "var(--pk-cream)",
        padding: "32px 47px",
        borderTop: "1px solid var(--pk-line)",
        borderBottom: "1px solid var(--pk-line)",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 400,
                fontSize: 56,
                lineHeight: 1,
                color: "var(--pk-ink)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {typeof stat.value === "number"
                ? stat.value.toLocaleString("id-ID")
                : stat.value}
            </span>
            <span
              style={{
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--pk-fg-2)",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
