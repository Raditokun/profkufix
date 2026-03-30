import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { RatingBadge } from "@/components/rating-badge";
import { ReviewCard } from "@/components/review-card";
import { MapPin, GraduationCap, Building2, ThumbsUp } from "lucide-react";

export const revalidate = 0; // Dynamic route

async function getProfessorData(id: string) {
  const { data: professor, error } = await supabase
    .from("professors")
    .select(
      `
      *,
      departments (
        name,
        faculties (
          name,
          universities (
            name,
            short_name,
            city,
            logo_url
          )
        )
      )
    `
    )
    .eq("id", id)
    .single();

  if (error || !professor) {
    if (error && error.code !== "PGRST116") {
      console.error("Failed to fetch professor:", error);
    }
    return null;
  }

  const { data: reviews, error: reviewError } = await supabase
    .from("reviews")
    .select("*")
    .eq("professor_id", id)
    .order("created_at", { ascending: false });

  if (reviewError) {
    console.error("Failed to fetch reviews:", reviewError);
  }

  return { professor, reviews: reviews ?? [] };
}

export default async function ProfessorProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pending?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedQuery = await searchParams;
  const data = await getProfessorData(resolvedParams.id);

  if (!data) {
    notFound();
  }

  const { professor, reviews } = data;
  const department = typeof professor.departments === "object" ? professor.departments : null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faculties = department?.faculties as any;
  const university = faculties?.universities;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Pending Banner */}
      {resolvedQuery.pending === "true" && (
        <div className="mb-8 rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-yellow-500 mb-1">Dosen Berhasil Diajukan!</h3>
            <p className="text-xs text-yellow-500/80">
              Terima kasih! Profil dosen ini sedang dalam status "Pending" dan menunggu moderasi dari tim kami sebelum muncul di hasil pencarian. Namun, Anda dapat mulai memberikan ulasan sekarang juga.
            </p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-border/50 pb-8">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-foreground">
            {professor.title ? `${professor.full_name}, ${professor.title}` : professor.full_name}
          </h1>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-6 text-muted-foreground">
            {department && (
              <span className="flex items-center gap-1.5 font-medium">
                <Building2 className="h-4 w-4 shrink-0 text-primary" />
                {department.name}
              </span>
            )}
            {university && (
              <span className="flex items-center gap-1.5 font-medium">
                <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
                {university.name}
              </span>
            )}
            {university?.city && (
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {university.city}
              </span>
            )}
          </div>
        </div>

        {/* Quick CTA */}
        <div className="flex shrink-0">
          <a
            href={`/masuk`}
            className="inline-flex h-11 sm:h-auto items-center justify-center rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 glow"
          >
            Beri Ulasan
          </a>
        </div>
      </section>

      {/* Aggregate Stats Section */}
      <section className="mb-16 grid gap-6 sm:grid-cols-3">
        {/* Overall Quality */}
        <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Kualitas Keseluruhan
          </h3>
          <div className="flex items-baseline gap-2">
            <RatingBadge
              value={professor.avg_rating || 0}
              size="lg"
              className="text-4xl"
            />
          </div>
          <p className="mt-4 text-xs font-medium text-muted-foreground/80">
            Dari {professor.review_count || 0} Ulasan
          </p>
        </div>

        {/* Difficulty */}
        <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Tingkat Kesulitan
          </h3>
          <div className="flex items-baseline gap-2">
            <RatingBadge
              value={professor.avg_difficulty || 0}
              type="difficulty"
              size="lg"
              className="text-4xl"
            />
          </div>
          <p className="mt-4 text-xs font-medium text-muted-foreground/80">
            Nilai ujian & tugas
          </p>
        </div>

        {/* Would Take Again */}
        <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Saran Pengulangan
          </h3>
          <div className="flex items-center justify-center h-[5.5rem]">
            {professor.would_take_again_pct !== null ? (
              <span className="text-4xl font-extrabold text-foreground tracking-tight">
                {professor.would_take_again_pct}%
              </span>
            ) : (
              <span className="text-muted-foreground font-medium text-lg">
                N/A
              </span>
            )}
          </div>
          <p className="mt-4 text-xs font-medium text-muted-foreground/80 flex items-center justify-center gap-1.5">
            <ThumbsUp className="h-3 w-3" />
            Akan mengambil kelas ini lagi
          </p>
        </div>
      </section>

      {/* Reviews Feed Section */}
      <section>
        <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-4">
          <h2 className="text-2xl font-bold">
            Ulasan Mahasiswa ({professor.review_count || 0})
          </h2>
          {/* Add sort/filter dropdown here later if needed */}
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                id={review.id}
                body={review.body}
                rating={review.rating}
                difficulty={review.difficulty}
                wouldTakeAgain={review.would_take_again}
                courseNameRaw={review.course_name_raw}
                gradeReceived={review.grade_received}
                semester={review.semester}
                tags={review.tags}
                createdAt={review.created_at}
                authorAlias={review.author_alias}
                thumbsUp={review.thumbs_up}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 rounded-2xl bg-card/20 border border-dashed border-border/60">
            <h3 className="text-lg font-semibold text-foreground/80">Belum ada ulasan</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              Jadilah yang pertama membagikan pengalaman belajar bersama dosen ini.
            </p>
            <a
              href={`/masuk`}
              className="inline-block mt-6 px-6 py-2 rounded-xl text-primary font-medium bg-primary/10 transition-colors hover:bg-primary/20"
            >
              Tulis ulasan pertama
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
