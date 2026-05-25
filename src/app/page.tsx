import Link from "next/link";
import { HeroSearch } from "@/components/hero-search";
import { UniListItem, UniversityCard } from "@/components/university-card";
import { StatsBar } from "@/components/stats-bar";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

async function getUniversities() {
  const { data, error } = await supabase
    .from("universities")
    .select("id, name, slug, short_name, city, logo_url, faculties(id)")
    .order("name");

  if (error) {
    console.error("Failed to fetch universities:", error);
    return [];
  }
  return data ?? [];
}

async function getCounts() {
  const [uniRes, profRes, reviewRes] = await Promise.all([
    supabase.from("universities").select("id", { count: "exact", head: true }),
    supabase.from("professors").select("id", { count: "exact", head: true }),
    supabase.from("reviews").select("id", { count: "exact", head: true }),
  ]);
  return {
    universities: uniRes.count ?? 0,
    professors: profRes.count ?? 0,
    reviews: reviewRes.count ?? 0,
  };
}

export default async function HomePage() {
  const [universities, counts] = await Promise.all([
    getUniversities(),
    getCounts(),
  ]);

  const topUnis = universities.slice(0, 6);
  const moreUnis = universities.slice(0, 8);

  return (
    <>
      <HeroSearch />

      <StatsBar
        universityCount={counts.universities}
        professorCount={counts.professors}
        reviewCount={counts.reviews}
      />

      {/* List Tempat Tinggal */}
      <section
        style={{
          background: "var(--pk-cream)",
          padding: "60px 24px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 700,
            fontSize: 31,
            letterSpacing: "0.01em",
            color: "var(--pk-ink)",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          List Tempat Tinggal
        </h2>
        <p
          style={{
            marginTop: 8,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 500,
            fontSize: 16,
            color: "var(--pk-fg-3)",
            textAlign: "center",
          }}
        >
          Universitas populer yang dicari mahasiswa minggu ini
        </p>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "min(420px, 100%)",
          }}
        >
          {topUnis.map((u) => (
            <UniListItem
              key={u.id}
              name={u.name}
              slug={u.slug}
              logoUrl={u.logo_url}
            />
          ))}
        </div>
      </section>

      {/* Featured universities grid */}
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
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 800,
              fontSize: 40,
              color: "var(--pk-ink)",
              letterSpacing: "-0.01em",
            }}
          >
            Universitas Unggulan
          </h2>
          <Link
            href="/cari"
            className="pk-link"
            style={{
              fontFamily: "var(--pk-font-ui)",
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            Lihat semua →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {moreUnis.map((u) => (
            <UniversityCard
              key={u.id}
              name={u.name}
              shortName={u.short_name ?? u.slug.toUpperCase()}
              city={u.city}
              slug={u.slug}
              facultyCount={Array.isArray(u.faculties) ? u.faculties.length : 0}
              logoUrl={u.logo_url}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "var(--pk-cream-soft)",
          borderTop: "1px solid var(--pk-line)",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2
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
            Punya Pengalaman dengan Dosenmu?
          </h2>
          <p
            style={{
              marginTop: 16,
              marginBottom: 0,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 500,
              fontSize: 18,
              color: "var(--pk-fg-2)",
            }}
          >
            Bantu sesama mahasiswa dengan membagikan ulasan jujurmu secara
            anonim. Tidak perlu akun — langsung tulis!
          </p>
          <Link
            href="/tambah-dosen"
            className="pk-cta-black"
            style={{
              marginTop: 32,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--pk-ink)",
              color: "var(--pk-paper)",
              height: 64,
              padding: "0 48px",
              borderRadius: 9999,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "0.04em",
              boxShadow: "var(--pk-shadow-2)",
              textDecoration: "none",
            }}
          >
            TULIS ULASAN SEKARANG
          </Link>
        </div>
      </section>
    </>
  );
}
