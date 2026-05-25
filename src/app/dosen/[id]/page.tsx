import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  Info,
  MessageSquare,
  Quote,
  Sparkles,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ReviewCard } from "@/components/review-card";
import { ratingTone, RATE_COLORS } from "@/lib/rating";

export const revalidate = 0;

async function getProfessorData(id: string) {
  const { data: professor, error } = await supabase
    .from("professors")
    .select(`
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
    `)
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

function buildRatingDistribution(reviews: { rating: number }[]) {
  const counts = [0, 0, 0, 0, 0];
  for (const r of reviews) {
    const n = Math.max(1, Math.min(5, Math.round(r.rating)));
    counts[n - 1]++;
  }
  return counts;
}

function topTags(reviews: { tags: string[] | null }[]) {
  const counts = new Map<string, number>();
  for (const r of reviews) {
    for (const t of r.tags ?? []) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label]) => label);
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

  if (!data) notFound();

  const { professor, reviews } = data;
  type Dept = {
    name?: string;
    faculties?: {
      name?: string;
      universities?: {
        name?: string;
        short_name?: string | null;
        city?: string | null;
        logo_url?: string | null;
      } | null;
    } | null;
  } | null;
  const department: Dept =
    typeof professor.departments === "object" ? professor.departments : null;
  const faculty = department?.faculties;
  const university = faculty?.universities;

  const ratingDist = buildRatingDistribution(reviews);
  const tags = topTags(reviews);

  const scoreItems = [
    {
      label: "Kejelasan",
      value: professor.avg_rating ?? 0,
    },
    {
      label: "Materi",
      value: professor.avg_rating ?? 0,
    },
    {
      label: "Kesulitan",
      value: 5 - (professor.avg_difficulty ?? 3),
    },
    {
      label: "Mau Lagi",
      value: (professor.would_take_again_pct ?? 0) / 20,
    },
  ];

  const displayName = professor.title
    ? `${professor.full_name}, ${professor.title}`
    : professor.full_name;

  const aggregate = professor.avg_rating ?? 0;
  const aggTone = ratingTone(aggregate);
  const totalReviews = ratingDist.reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-10">
      {resolvedQuery.pending === "true" && (
        <div className="rounded-xl bg-amber-50 ring-1 ring-amber-200 p-5 flex gap-4 items-start">
          <div className="grid place-items-center size-9 rounded-lg bg-amber-100 shrink-0">
            <Info className="size-5 text-amber-700" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-amber-900">
              Dosen Berhasil Diajukan!
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Profil dosen ini masih dalam status &quot;Pending&quot; dan
              menunggu moderasi tim ProfKu sebelum muncul di hasil pencarian.
              Tapi kamu sudah bisa langsung memberikan ulasan!
            </p>
          </div>
        </div>
      )}

      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-sm text-stone-500"
      >
        <Link href="/" className="hover:text-stone-900 transition">
          Beranda
        </Link>
        <ChevronRight className="size-4 text-stone-300" />
        <Link href="/cari" className="hover:text-stone-900 transition">
          Hasil Pencarian
        </Link>
        <ChevronRight className="size-4 text-stone-300" />
        <span className="text-stone-900 font-medium truncate">
          {professor.full_name}
        </span>
      </nav>

      {/* Hero split: identity + KPI rail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Identity card */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 lg:p-8 ring-1 ring-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="grid place-items-center size-20 rounded-full bg-emerald-50 ring-1 ring-emerald-100 shrink-0">
              <GraduationCap className="size-10 text-emerald-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 leading-tight">
                {displayName}
              </h1>
              <p className="mt-2 text-base text-stone-600">
                {department?.name && <>Dosen {department.name}</>}
                {university?.name && (
                  <>
                    <span className="text-stone-300 mx-2">·</span>
                    {university.name}
                  </>
                )}
              </p>
              {faculty?.name && (
                <p className="mt-1 text-sm text-stone-500">{faculty.name}</p>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-stone-100 flex flex-col sm:flex-row sm:items-end gap-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-6xl sm:text-7xl font-bold tabular-nums leading-none ${aggTone.text}`}
                >
                  {aggregate.toFixed(1)}
                </span>
                <span className="text-2xl font-semibold text-stone-300 tabular-nums">
                  /5.0
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-500">
                Rating Keseluruhan
                <span className="text-stone-300 mx-1.5">·</span>
                {(professor.review_count ?? 0).toLocaleString("id-ID")} ulasan
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:ml-auto">
              <Link
                href={`/dosen/${professor.id}/tulis-ulasan`}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 shadow-sm shadow-emerald-900/20 transition"
              >
                Tulis Ulasan
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/cari"
                className="inline-flex items-center h-11 px-5 rounded-lg bg-white text-stone-700 text-sm font-semibold ring-1 ring-stone-200 hover:bg-stone-50 transition"
              >
                Bandingkan
              </Link>
            </div>
          </div>
        </div>

        {/* KPI rail */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="rounded-xl bg-white p-5 ring-1 ring-stone-200">
            <div className="flex items-center gap-2 text-stone-500">
              <ThumbsUp className="size-4" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Mau Diajar Lagi
              </span>
            </div>
            <p className="mt-3 text-3xl lg:text-4xl font-bold tabular-nums text-stone-900">
              {professor.would_take_again_pct != null
                ? `${professor.would_take_again_pct}%`
                : "—"}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 ring-1 ring-stone-200">
            <div className="flex items-center gap-2 text-stone-500">
              <TrendingUp className="size-4" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Tingkat Kesulitan
              </span>
            </div>
            <p className="mt-3 text-3xl lg:text-4xl font-bold tabular-nums text-stone-900">
              {professor.avg_difficulty != null
                ? professor.avg_difficulty.toFixed(1)
                : "—"}
              <span className="text-base font-semibold text-stone-300 ml-1">
                /5
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Aspect scores + distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="rounded-xl bg-white p-6 lg:p-7 ring-1 ring-stone-200">
          <h2 className="text-lg font-semibold text-stone-900">
            Rating Per Aspek
          </h2>
          <div className="mt-5 space-y-4">
            {scoreItems.map((item) => {
              const pct = Math.max(
                0,
                Math.min(100, (item.value / 5) * 100)
              );
              const tone = ratingTone(item.value);
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium text-stone-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold tabular-nums text-stone-900">
                      {item.value.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${tone.bar} rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 lg:p-7 ring-1 ring-stone-200">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-stone-900">
              Distribusi Rating
            </h2>
            <span className="text-sm text-stone-500">
              {totalReviews.toLocaleString("id-ID")} ulasan
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {[5, 4, 3, 2, 1].map((n) => {
              const count = ratingDist[n - 1];
              const pct = totalReviews ? (count / totalReviews) * 100 : 0;
              const tone = ratingTone(n);
              return (
                <div key={n} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-stone-700 tabular-nums">
                    {n}
                    <span
                      aria-hidden
                      className="size-2 rounded-full"
                      style={{ background: RATE_COLORS[n - 1] }}
                    />
                  </span>
                  <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${tone.bar} rounded-full transition-all`}
                      style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                  <span className="text-sm tabular-nums text-stone-500 w-14 text-right">
                    {count} ({pct.toFixed(0)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top tags */}
      <div className="rounded-xl bg-white p-6 lg:p-7 ring-1 ring-stone-200">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-emerald-700" />
          <h2 className="text-lg font-semibold text-stone-900">Top Tags</h2>
        </div>
        {tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800 ring-1 ring-inset ring-emerald-100"
              >
                {t}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-stone-500">
            Belum ada tag — jadilah yang pertama menulis review!
          </p>
        )}
      </div>

      {/* Reviews */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-stone-900">
            Review Mahasiswa{" "}
            <span className="text-stone-400 font-semibold tabular-nums">
              ({reviews.length})
            </span>
          </h2>
          <Link
            href={`/dosen/${professor.id}/tulis-ulasan`}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 shadow-sm shadow-emerald-900/20 transition self-start"
          >
            <Quote className="size-4" />
            Tulis Review
          </Link>
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-4">
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
          <div className="rounded-xl bg-white p-12 ring-1 ring-stone-200 text-center">
            <div className="mx-auto grid place-items-center size-12 rounded-full bg-stone-100">
              <MessageSquare className="size-6 text-stone-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-stone-900">
              Belum ada review
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              Jadilah yang pertama membagikan pengalaman belajar bersama dosen
              ini.
            </p>
            <Link
              href={`/dosen/${professor.id}/tulis-ulasan`}
              className="mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition"
            >
              Tulis Review Pertama
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
