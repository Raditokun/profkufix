export function Footer() {
  return (
    <footer
      style={{
        background: "var(--pk-cream)",
        borderTop: "1px solid var(--pk-line)",
        padding: "32px 47px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 700,
            fontSize: 24,
            color: "var(--pk-ink)",
            letterSpacing: "-0.01em",
          }}
        >
          PROFKU
        </span>
        <div
          style={{
            display: "flex",
            gap: 28,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 600,
            fontSize: 14,
            color: "var(--pk-fg-3)",
          }}
        >
          <span>Tentang</span>
          <span>Kontak</span>
          <span>Kebijakan Privasi</span>
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--pk-font-ui)",
            fontSize: 13,
            color: "var(--pk-fg-3)",
          }}
        >
          &copy; 2026 PROFKU. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
