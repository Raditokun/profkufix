import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
