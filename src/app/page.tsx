import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { HomeSearchForm } from "@/components/home-search-form";

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

// Retained for future use; intentionally not called on the new minimalist landing page.
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
void getCounts;

export default async function HomePage() {
  const universities = await getUniversities();
  const featuredUnis = universities.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-stone-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(4,120,87,0.10),transparent)]"
        />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.05]">
            Temukan Dosen &amp; Universitas{" "}
            <span className="text-emerald-700">Terbaikmu</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Ulasan jujur dari mahasiswa untuk mahasiswa. Riset dosen dan kampus
            sebelum KRS — biar gak salah pilih mata kuliah maut.
          </p>

          <div className="mt-10">
            <HomeSearchForm />
          </div>
        </div>
      </section>

      {/* Featured universities */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-stone-900">
                Universitas Unggulan
              </h2>
              <p className="mt-2 text-base text-stone-600">
                Kampus populer yang dicari mahasiswa minggu ini.
              </p>
            </div>
            <Link
              href="/cari"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Lihat semua
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {featuredUnis.length === 0 ? (
            <div className="rounded-xl bg-white p-12 ring-1 ring-stone-200 text-center">
              <Building2 className="mx-auto size-10 text-stone-300" />
              <p className="mt-3 text-sm text-stone-500">
                Belum ada universitas terdaftar.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredUnis.map((u) => {
                const facultyCount = Array.isArray(u.faculties)
                  ? u.faculties.length
                  : 0;
                const logo = u.logo_url;
                return (
                  <Link
                    key={u.id}
                    href={`/universitas/${u.slug}`}
                    className="group rounded-xl bg-white p-6 ring-1 ring-stone-200 hover:ring-emerald-300 hover:shadow-md hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-start gap-4">
                      <div className="size-14 rounded-lg bg-stone-100 grid place-items-center overflow-hidden shrink-0">
                        {logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={logo}
                            alt=""
                            className="size-full object-contain"
                          />
                        ) : (
                          <Building2 className="size-6 text-stone-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-stone-900 leading-snug group-hover:text-emerald-700 transition">
                          {u.name}
                        </h3>
                        <p className="mt-1 text-sm text-stone-500">
                          {u.city || "Indonesia"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-1.5 text-stone-600">
                        <Building2 className="size-4 text-stone-400" />
                        {facultyCount} Fakultas
                      </span>
                      <span className="font-semibold text-emerald-700 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        Lihat
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/cari"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700"
            >
              Lihat semua universitas
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Punya Pengalaman dengan Dosenmu?
          </h2>
          <p className="mt-4 text-base lg:text-lg text-emerald-100 max-w-2xl mx-auto">
            Bantu sesama mahasiswa dengan membagikan ulasan jujurmu secara
            anonim. Tidak perlu akun — langsung tulis.
          </p>
          <Link
            href="/tambah-dosen"
            className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-lg bg-white text-emerald-800 text-sm font-semibold shadow-lg shadow-emerald-950/30 hover:bg-emerald-50 transition"
          >
            Tulis Ulasan Sekarang
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
