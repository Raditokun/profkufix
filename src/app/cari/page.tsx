import { supabase } from "@/lib/supabase";
import { ProfessorCard } from "@/components/professor-card";
import { Search } from "lucide-react";

export const revalidate = 0; // Dynamic route

async function getSearchResults(query: string) {
  if (!query) return [];

  // Querying using standard websearch against the search_vector column.
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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Search Header */}
      <div className="mb-10 border-b border-border/50 pb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Hasil Pencarian untuk <span className="gradient-text">"{q}"</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ditemukan {results.length} dosen yang sesuai.
        </p>
      </div>

      {/* Results List */}
      {results.length > 0 ? (
        <div className="grid gap-4">
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          results.map((prof: any) => (
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
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 py-20 text-center glass">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold">Dosen Tidak Ditemukan</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Kami tidak menemukan kecocokan untuk pencarian Anda. Pastikan ejaan
            nama atau kata kunci lain sudah benar.
          </p>
        </div>
      )}
    </div>
  );
}
