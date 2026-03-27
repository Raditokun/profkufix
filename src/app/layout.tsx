import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProfKu — Temukan & Nilai Dosenmu",
  description:
    "Platform ulasan dosen universitas Indonesia. Cari dosen, baca ulasan mahasiswa, dan bagikan pengalamanmu secara anonim.",
  keywords: [
    "ulasan dosen",
    "rate my professor",
    "universitas indonesia",
    "ITS",
    "UI",
    "ITB",
    "UGM",
    "UNAIR",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
