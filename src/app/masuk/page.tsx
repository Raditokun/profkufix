import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = {
  title: "Masuk — PROFKU",
  description: "Masuk atau daftar ke PROFKU untuk menulis ulasan dosen.",
};

export default function MasukPage() {
  return (
    <Suspense fallback={null}>
      <AuthCard />
    </Suspense>
  );
}
