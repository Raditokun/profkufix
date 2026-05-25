import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { DosenIdentity } from "@/components/dosen-identity";
import { RatingPanel } from "@/components/rating-panel";
import { ScoreList } from "@/components/score-row";
import { ReviewCard } from "@/components/review-card";
import { MutedTag } from "@/components/personality-tags";

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
      label: "KEJELASAN",
      icon: "/profku/icons/reputasi.png",
      value: professor.avg_rating ?? 0,
    },
    {
      label: "MATERI",
      icon: "/profku/icons/organisasi.png",
      value: professor.avg_rating ?? 0,
    },
    {
      label: "KESULITAN",
      icon: "/profku/icons/keamanan.png",
      value: 5 - (professor.avg_difficulty ?? 3),
    },
    {
      label: "MAU LAGI",
      icon: "/profku/icons/reputasi.png",
      value: (professor.would_take_again_pct ?? 0) / 20,
    },
  ];

  const displayName = professor.title
    ? `${professor.full_name}, ${professor.title}`
    : professor.full_name;

  return (
    <div
      style={{
        background: "var(--pk-cream)",
        padding: "32px 47px 80px",
        maxWidth: 1440,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      {/* Pending banner */}
      {resolvedQuery.pending === "true" && (
        <div
          style={{
            background: "var(--pk-info-soft)",
            border: "1px solid var(--pk-info)",
            borderRadius: 20,
            padding: "20px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 700,
              fontSize: 18,
              color: "var(--pk-ink)",
            }}
          >
            Dosen Berhasil Diajukan!
          </h3>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--pk-font-ui)",
              fontSize: 14,
              color: "var(--pk-fg-2)",
            }}
          >
            Profil dosen ini masih dalam status &quot;Pending&quot; dan menunggu
            moderasi tim ProfKu sebelum muncul di hasil pencarian. Tapi kamu
            sudah bisa langsung memberikan ulasan!
          </p>
        </div>
      )}

      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          fontFamily: "var(--pk-font-ui)",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--pk-fg-3)",
        }}
      >
        <Link href="/" style={{ color: "inherit" }}>
          Beranda
        </Link>
        <span>/</span>
        <Link href="/cari" style={{ color: "inherit" }}>
          Hasil Pencarian
        </Link>
        <span>/</span>
        <span style={{ color: "var(--pk-ink)" }}>{professor.full_name}</span>
      </div>

      {/* Top: identity + ratings */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 654px) minmax(0, 1fr)",
          gap: 36,
        }}
      >
        <DosenIdentity
          id={professor.id}
          name={displayName}
          department={department?.name}
          university={university?.name}
          ratingCount={professor.review_count ?? 0}
          likePct={professor.would_take_again_pct}
          difficulty={professor.avg_difficulty}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <RatingPanel counts={ratingDist} />
          <div
            style={{
              background: "var(--pk-lavender)",
              borderRadius: 25,
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 700,
                fontSize: 20,
                color: "var(--pk-ink)",
              }}
            >
              Dosen Sepertinya
            </span>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 500,
                fontSize: 14,
                color: "var(--pk-fg-2)",
              }}
            >
              Sistem rekomendasi dosen serupa segera hadir.
            </p>
          </div>
        </div>
      </div>

      {/* Tags + per-aspek scores */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
          gap: 24,
        }}
      >
        <div
          style={{
            background: "var(--pk-paper)",
            borderRadius: 30,
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 800,
              fontSize: 28,
              color: "var(--pk-ink)",
            }}
          >
            Top Tags
          </h3>
          {tags.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {tags.map((t) => (
                <MutedTag key={t}>{t}</MutedTag>
              ))}
            </div>
          ) : (
            <p
              style={{
                margin: 0,
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--pk-fg-3)",
              }}
            >
              Belum ada tag — jadilah yang pertama menulis review!
            </p>
          )}
        </div>
        <div
          style={{
            background: "var(--pk-paper)",
            borderRadius: 30,
            padding: "28px 32px",
          }}
        >
          <ScoreList items={scoreItems} title="Rating Per Aspek" />
        </div>
      </div>

      {/* Reviews */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
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
            Review Mahasiswa ({reviews.length})
          </h3>
          <Link
            href={`/dosen/${professor.id}/tulis-ulasan`}
            className="pk-cta-black"
            style={{
              background: "var(--pk-ink)",
              color: "var(--pk-paper)",
              height: 44,
              padding: "0 24px",
              borderRadius: 9999,
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.04em",
              boxShadow: "var(--pk-shadow-2)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            TULIS REVIEW
          </Link>
        </div>

        {reviews.length > 0 ? (
          reviews.map((review) => (
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
          ))
        ) : (
          <div
            style={{
              background: "var(--pk-paper)",
              border: "1px solid var(--pk-line)",
              borderRadius: 24,
              padding: "48px 32px",
              textAlign: "center",
            }}
          >
            <h4
              style={{
                margin: 0,
                fontFamily: "var(--pk-font-ui)",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--pk-ink)",
              }}
            >
              Belum ada review
            </h4>
            <p
              style={{
                marginTop: 8,
                marginBottom: 0,
                fontFamily: "var(--pk-font-ui)",
                fontSize: 15,
                color: "var(--pk-fg-3)",
              }}
            >
              Jadilah yang pertama membagikan pengalaman belajar bersama dosen
              ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
