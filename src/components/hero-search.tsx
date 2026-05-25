"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/cari?q=${encodeURIComponent(q)}` : "/cari");
  };

  return (
    <section
      style={{
        background: "var(--pk-cream)",
        padding: "80px 24px 100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--pk-font-display)",
          fontWeight: 700,
          fontSize: "clamp(64px, 9vw, 128px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          margin: 0,
          color: "var(--pk-paper)",
          WebkitTextStroke: "2px var(--pk-ink)",
          textAlign: "center",
        }}
      >
        Cari{" "}
        <span style={{ color: "#4C8F3F", WebkitTextStroke: "0" }}>
          Universitasmu&nbsp;!
        </span>
      </h1>
      <p
        style={{
          marginTop: 18,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 500,
          fontSize: 22,
          color: "var(--pk-fg-2)",
          textAlign: "center",
          maxWidth: 720,
        }}
      >
        Rating jujur dari mahasiswa Indonesia. Lihat dosen &amp; kampus sebelum
        KRS, biar gak ketipu mata kuliah maut.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: 56,
          width: "min(786px, 100%)",
          height: 81,
          background: "var(--pk-paper)",
          border: "1px solid var(--pk-black)",
          borderRadius: 9999,
          boxShadow: "var(--pk-shadow-2)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px 0 28px",
          gap: 16,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 36,
            height: 36,
            background:
              "url('/profku/icons/search.jpg') center / cover no-repeat",
            transform: "scaleX(-1)",
            opacity: 0.9,
            flexShrink: 0,
          }}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari Universitasmu"
          aria-label="Cari Universitas"
          style={{
            flex: 1,
            border: 0,
            outline: 0,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 700,
            fontSize: 22,
            color: "var(--pk-ink)",
            background: "transparent",
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          style={{
            background: "var(--pk-ink)",
            color: "var(--pk-paper)",
            border: 0,
            height: 54,
            padding: "0 32px",
            borderRadius: 9999,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.04em",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          CARI
        </button>
      </form>
    </section>
  );
}
