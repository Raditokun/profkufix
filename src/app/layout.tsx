import type { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROFKU — Cari Universitasmu",
  description:
    "Rating jujur dari mahasiswa Indonesia. Lihat dosen & kampus sebelum KRS, biar gak ketipu mata kuliah maut.",
  keywords: [
    "ulasan dosen",
    "rate my professor",
    "universitas indonesia",
    "ITS",
    "UI",
    "ITB",
    "UGM",
    "UNAIR",
    "KRS",
  ],
};

const navLinkClass =
  "text-sm font-medium text-stone-600 hover:text-stone-900 transition";

function Wordmark({ size = "default" }: { size?: "default" | "sm" }) {
  const isSm = size === "sm";
  return (
    <span className="flex items-center gap-2">
      <Leaf
        className={`${isSm ? "size-5" : "size-6"} text-emerald-700`}
        strokeWidth={2.25}
        aria-hidden
      />
      <span
        className={`font-extrabold tracking-tight text-stone-900 ${
          isSm ? "text-base" : "text-xl"
        }`}
      >
        PROFKU
      </span>
    </span>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-stone-50 text-stone-900 antialiased min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur ring-1 ring-stone-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
            <Link href="/" className="hover:opacity-80 transition">
              <Wordmark />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/cari" className={navLinkClass}>
                Cari Dosen
              </Link>
              <Link
                href="#"
                aria-disabled="true"
                className="text-sm font-medium text-stone-400 cursor-not-allowed"
              >
                Cari Universitas
              </Link>
              <Link href="/tambah-dosen" className={navLinkClass}>
                Tambah Dosen
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/masuk"
                className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-100 transition"
              >
                Masuk
              </Link>
              <Link
                href="/masuk?signup=1"
                className="inline-flex items-center px-4 py-1.5 rounded-md text-sm font-medium bg-emerald-700 text-white hover:bg-emerald-800 transition"
              >
                Daftar
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-white ring-1 ring-stone-200 mt-auto">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <Wordmark size="sm" />
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
              <Link href="#" className="hover:text-stone-900 transition">
                Tentang
              </Link>
              <Link href="#" className="hover:text-stone-900 transition">
                Kontak
              </Link>
              <Link href="#" className="hover:text-stone-900 transition">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="hover:text-stone-900 transition">
                Syarat &amp; Ketentuan
              </Link>
            </nav>
            <p className="text-xs text-stone-500">
              &copy; 2026 PROFKU. Hak cipta dilindungi.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
