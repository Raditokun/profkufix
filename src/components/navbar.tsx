import Link from "next/link";

const navLinkStyle: React.CSSProperties = {
  fontFamily: "var(--pk-font-ui)",
  fontWeight: 700,
  fontSize: 18,
  color: "var(--pk-ink)",
  textDecoration: "none",
  padding: "8px 14px",
  cursor: "pointer",
};

const navBtnStyle: React.CSSProperties = {
  background: "var(--pk-black)",
  color: "var(--pk-paper)",
  border: "1px solid var(--pk-black)",
  height: 35,
  padding: "0 18px",
  fontFamily: "var(--pk-font-ui)",
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: "0.02em",
  boxShadow: "var(--pk-shadow-2)",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
};

export function Navbar() {
  return (
    <header
      style={{
        background: "var(--pk-cream)",
        height: 104,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 47px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 40,
          color: "var(--pk-ink)",
          letterSpacing: "-0.01em",
          textDecoration: "none",
        }}
      >
        PROFKU
      </Link>
      <nav style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <Link href="/cari" style={navLinkStyle}>
          Cari Dosen
        </Link>
        <Link href="/cari" style={navLinkStyle}>
          Cari Universitas
        </Link>
        <Link href="/masuk" style={{ ...navBtnStyle, opacity: 0.92 }}>
          LOG IN
        </Link>
        <Link href="/masuk?signup=1" style={navBtnStyle}>
          SIGN IN
        </Link>
      </nav>
    </header>
  );
}
