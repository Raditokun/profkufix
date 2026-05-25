import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { AddProfessorForm } from "@/components/add-professor-form";

export const revalidate = 0;

export default async function TambahDosenPage() {
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
      <div
        style={{
          padding: "80px 24px",
          textAlign: "center",
          color: "var(--pk-bad-strong)",
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
        }}
      >
        Gagal memuat data universitas. Silakan coba lagi nanti.
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--pk-cream)",
        padding: "32px 47px 80px",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <Link
        href="/cari"
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
        ← Kembali ke pencarian
      </Link>

      <section
        style={{
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 800,
            fontSize: 48,
            color: "var(--pk-ink)",
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
          }}
        >
          Tambahkan Dosen
        </h1>
        <p
          style={{
            marginTop: 12,
            marginBottom: 0,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 500,
            fontSize: 16,
            color: "var(--pk-fg-3)",
            lineHeight: 1.5,
          }}
        >
          Pastikan dosen belum terdaftar lewat fitur pencarian dulu. Semua data
          akan ditinjau tim PROFKU sebelum dipublikasi (status &quot;Pending&quot;).
        </p>
      </section>

      <AddProfessorForm taxonomy={universities || []} />
    </div>
  );
}
