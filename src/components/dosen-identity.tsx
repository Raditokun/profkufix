import Link from "next/link";

interface DosenIdentityProps {
  id: string;
  name: string;
  department?: string | null;
  university?: string | null;
  photoUrl?: string | null;
  ratingCount: number;
  likePct?: number | null;
  difficulty?: number | null;
}

export function DosenIdentity({
  id,
  name,
  department,
  university,
  photoUrl,
  ratingCount,
  likePct,
  difficulty,
}: DosenIdentityProps) {
  const photo = photoUrl || "/profku/img/uni-logo-its.png";
  return (
    <div
      style={{
        background: "var(--pk-rose-400)",
        borderRadius: 20,
        padding: "40px 40px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        minHeight: 720,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 800,
          fontSize: 40,
          color: "var(--pk-ink)",
          textAlign: "center",
          lineHeight: 1.05,
        }}
      >
        {name}
      </h2>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 500,
          fontSize: 18,
          color: "var(--pk-fg-2)",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {department && <>Dosen {department}</>}
        {university && (
          <>
            <br />
            {university}
          </>
        )}
      </p>
      <div
        aria-hidden
        style={{
          width: 213,
          height: 213,
          borderRadius: "50%",
          background: `url('${photo}') center / cover no-repeat var(--pk-cream-soft)`,
          marginTop: 8,
        }}
      />
      <p
        style={{
          margin: 0,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 18,
          color: "var(--pk-ink)",
          textAlign: "center",
        }}
      >
        Rating Berdasarkan {ratingCount.toLocaleString("id-ID")}{" "}
        {ratingCount === 1 ? "Mahasiswa" : "Mahasiswa"}
      </p>
      <div style={{ display: "flex", gap: 56, marginTop: 8 }}>
        <Metric
          value={likePct != null ? `${likePct}%` : "—"}
          label="Mau Diajar Lagi"
        />
        <Divider />
        <Metric
          value={difficulty != null ? difficulty.toFixed(1) : "—"}
          label="Tingkat Kesulitan"
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: "auto",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link href={`/dosen/${id}/tulis-ulasan`} style={btnStyle}>
          RATE
        </Link>
        <Link href={`/cari`} style={btnStyle}>
          BANDINGKAN
        </Link>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
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
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 500,
          fontSize: 14,
          color: "var(--pk-fg-2)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      style={{
        width: 4,
        background: "var(--pk-ink)",
        borderRadius: 2,
        alignSelf: "stretch",
      }}
    />
  );
}

const btnStyle: React.CSSProperties = {
  background: "var(--pk-ink)",
  color: "var(--pk-paper)",
  border: 0,
  height: 48,
  padding: "0 36px",
  borderRadius: 27,
  fontFamily: "var(--pk-font-ui)",
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: "0.02em",
  boxShadow: "var(--pk-shadow-2)",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};
