import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ProfessorCard } from "@/components/professor-card";

export const revalidate = 0;

async function getSearchResults(query: string) {
  if (!query) return [];

  const { data, error } = await supabase
    .from("professors")
    .select(`
      id,
      full_name,
      title,
      avg_rating,
      review_count,
      department_id,
      departments (
        name,
        faculties (
          universities (
            name,
            short_name,
            city
          )
        )
      )
    `)
    .eq("status", "approved")
    .textSearch("search_vector", query, { type: "websearch" })
    .order("review_count", { ascending: false });

  if (error) {
    console.error("Search error:", error);
    return [];
  }
  return data;
}

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const rawQuery = resolvedParams.q;
  const q = typeof rawQuery === "string" ? rawQuery : "";

  const results = await getSearchResults(q);

  return (
    <section
      style={{
        background: "var(--pk-cream)",
        padding: "40px 47px 80px",
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            background: "transparent",
            border: 0,
            cursor: "pointer",
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 700,
            fontSize: 14,
            color: "var(--pk-fg-3)",
            padding: 0,
            textDecoration: "none",
          }}
        >
          ← Beranda
        </Link>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 800,
            fontSize: 40,
            color: "var(--pk-ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          Hasil untuk{" "}
          <span style={{ color: "var(--pk-primary)" }}>
            &quot;{q || "semua dosen"}&quot;
          </span>
        </h1>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 500,
            fontSize: 16,
            color: "var(--pk-fg-3)",
          }}
        >
          {results.length} dosen
        </span>
      </div>

      {results.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* eslint-disable @typescript-eslint/no-explicit-any */}
          {results.map((prof: any) => (
            <ProfessorCard
              key={prof.id}
              id={prof.id}
              fullName={prof.full_name}
              title={prof.title}
              department={prof.departments}
              avgRating={prof.avg_rating}
              reviewCount={prof.review_count}
            />
          ))}
          {/* eslint-enable */}
        </div>
      ) : (
        <EmptyState query={q} />
      )}
    </section>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div
      style={{
        background: "var(--pk-paper)",
        border: "1px solid var(--pk-line)",
        borderRadius: 30,
        padding: "60px 40px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 800,
          fontSize: 32,
          color: "var(--pk-ink)",
          letterSpacing: "-0.01em",
        }}
      >
        Dosen Tidak Ditemukan
      </h3>
      <p
        style={{
          margin: 0,
          maxWidth: 480,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 500,
          fontSize: 16,
          color: "var(--pk-fg-3)",
        }}
      >
        {query
          ? `Kami tidak menemukan kecocokan untuk "${query}". Pastikan ejaan
              nama atau kata kunci lain sudah benar.`
          : "Coba kata kunci nama dosen atau universitas di kotak pencarian."}
      </p>
      <Link
        href="/tambah-dosen"
        className="pk-cta-black"
        style={{
          marginTop: 12,
          display: "inline-flex",
          alignItems: "center",
          background: "var(--pk-ink)",
          color: "var(--pk-paper)",
          height: 48,
          padding: "0 32px",
          borderRadius: 9999,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: "0.04em",
          textDecoration: "none",
          boxShadow: "var(--pk-shadow-2)",
        }}
      >
        TAMBAH DOSEN BARU
      </Link>
    </div>
  );
}
