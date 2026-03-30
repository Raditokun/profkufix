import { supabase } from "@/lib/supabase";
import { AddProfessorForm } from "@/components/add-professor-form";

export const revalidate = 0; // Fetch fresh taxonomy on load

export default async function TambahDosenPage() {
  // Fetch full taxonomy: University -> Faculty -> Department
  const { data: universities, error } = await supabase
    .from("universities")
    .select(`
      id,
      name,
      short_name,
      faculties (
        id,
        name,
        departments (
          id,
          name
        )
      )
    `)
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch university taxonomy:", error);
    return (
      <div className="text-center py-20 text-red-500">
        Gagal memuat data universitas. Silakan coba lagi nanti.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl text-foreground mb-4">
          Tambahkan Dosen
        </h1>
        <p className="text-muted-foreground">
          Pastikan dosen belum terdaftar dengan menggunakan fitur pencarian
          terlebih dahulu. Semua data yang dikirimkan akan ditinjau oleh tim
          ProfKu sebelum dipublikasikan (Pending Status).
        </p>
      </section>

      {/* Rendering Client-Side Cascading Form */}
      <AddProfessorForm taxonomy={universities || []} />
    </div>
  );
}
