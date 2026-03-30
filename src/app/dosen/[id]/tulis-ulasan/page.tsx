import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { SubmitReviewForm } from "@/components/submit-review-form";
import { Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
          name,
          universities (
            name
          )
        )
      )
    `
    )
    .eq("id", resolvedParams.id)
    .single();

  if (error || !professor) {
    notFound();
  }

  const department = typeof professor.departments === "object" ? professor.departments : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Back Link */}
      <Link
        href={`/dosen/${professor.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Profil {professor.full_name}
      </Link>

      {/* Header Section */}
      <section className="mb-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl text-foreground mb-2">
          Beri Ulasan
        </h1>
        <p className="text-muted-foreground text-lg">
          Pengalaman Anda akan membantu mahasiswa lain di{" "}
          <span className="font-semibold text-foreground">
            {professor.title ? `${professor.full_name}, ${professor.title}` : professor.full_name}
          </span>
          .
        </p>

        {department && (
          <div className="mt-4 flex items-center gap-1.5 font-medium text-primary">
            <Building2 className="h-4 w-4 shrink-0" />
            {department.name}
          </div>
        )}
      </section>

      {/* Warning/Guideline */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6">
        <h3 className="text-sm font-bold text-primary mb-1">Panduan Pengisian:</h3>
        <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
          <li>Ulasan ini bersifat 100% anonim kecuali Anda mengisi nama alias.</li>
          <li>Jadilah objektif dan fair. Jangan gunakan bahasa kotor atau ujaran kebencian.</li>
          <li>Fokus pada metode pengajaran, beban tugas, dan keadilan nilai.</li>
        </ul>
      </div>

      {/* Form Section */}
      <SubmitReviewForm professorId={resolvedParams.id} />
    </div>
  );
}
