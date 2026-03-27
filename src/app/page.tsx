import { HeroSearch } from "@/components/hero-search";
import { UniversityCard } from "@/components/university-card";
import { StatsBar } from "@/components/stats-bar";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getUniversities() {
  const { data, error } = await supabase
    .from("universities")
    .select("id, name, slug, short_name, city, faculties(id)")
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

  return (
    <>
      {/* Hero Section */}
      <HeroSearch />

      {/* Stats */}
      <StatsBar
        universityCount={counts.universities}
        professorCount={counts.professors}
        reviewCount={counts.reviews}
      />

      {/* Universities Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Universitas <span className="gradient-text">Unggulan</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Jelajahi universitas ternama di Indonesia dan temukan dosen terbaik
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((uni) => (
            <UniversityCard
              key={uni.id}
              name={uni.name}
              shortName={uni.short_name ?? uni.slug.toUpperCase()}
              city={uni.city}
              slug={uni.slug}
              facultyCount={Array.isArray(uni.faculties) ? uni.faculties.length : 0}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-card/20">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Punya Pengalaman dengan Dosenmu?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Bantu sesama mahasiswa dengan membagikan ulasan jujurmu secara
            anonim. Tidak perlu akun — langsung tulis!
          </p>
          <div className="mt-8">
            <a
              href="/masuk"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-primary-foreground font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 glow"
            >
              Tulis Ulasan Sekarang
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
