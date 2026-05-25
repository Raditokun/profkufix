import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SubmitReviewForm } from "@/components/submit-review-form";

export const revalidate = 0;

export default async function TulisUlasanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const { data: professor, error } = await supabase
    .from("professors")
    .select(
      `
      *,
      departments (
        name,
        faculties (
          universities (
            name
          )
        )
      )
    `
    )
    .eq("id", resolvedParams.id)
    .single();

  if (error || !professor) notFound();

  type Dept = {
    name?: string;
    faculties?: {
      universities?: { name?: string } | null;
    } | null;
  } | null;
  const department: Dept =
    typeof professor.departments === "object" ? professor.departments : null;
  const university = department?.faculties?.universities;

  const displayName = professor.title
    ? `${professor.full_name}, ${professor.title}`
    : professor.full_name;

  return (
    <div
      style={{
        background: "var(--pk-cream)",
        padding: "32px 47px 80px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <Link
        href={`/dosen/${professor.id}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 14,
          color: "var(--pk-fg-3)",
          textDecoration: "none",
          marginBottom: 24,
        }}
      >
        ← Kembali ke profil {professor.full_name}
      </Link>

      {/* Identity strip */}
      <div
        style={{
          background: "var(--pk-fg-3)",
          color: "var(--pk-paper)",
          borderRadius: 30,
          padding: "24px 36px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div
          aria-hidden
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background:
              "url('/profku/img/uni-logo-its.png') center/cover no-repeat var(--pk-cream-soft)",
            flexShrink: 0,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 800,
              fontSize: 28,
              lineHeight: 1.1,
            }}
          >
            Rate · {displayName}
          </span>
          <span
            style={{
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 500,
              fontSize: 15,
              opacity: 0.85,
            }}
          >
            {department?.name && <>{department.name}</>}
            {university?.name && <> · {university.name}</>}
          </span>
        </div>
      </div>

      {/* Panduan */}
      <div
        style={{
          marginTop: 24,
          background: "var(--pk-primary-50)",
          border: `1px solid var(--pk-primary)`,
          borderRadius: 20,
          padding: "16px 24px",
          fontFamily: "var(--pk-font-ui)",
          fontSize: 14,
          color: "var(--pk-fg-2)",
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: "var(--pk-primary)" }}>Panduan:</strong>{" "}
        Ulasanmu 100% anonim. Fokus pada metode pengajaran, beban tugas, dan
        keadilan nilai. Jangan gunakan bahasa kotor.
      </div>

      <SubmitReviewForm professorId={resolvedParams.id} />
    </div>
  );
}
