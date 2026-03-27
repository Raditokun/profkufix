import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Masuk — ProfKu",
  description: "Masuk atau daftar ke ProfKu untuk menulis ulasan dosen.",
};

export default function MasukPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 hero-gradient">
      {/* Back link */}
      <Link
        href="/"
        className="absolute left-4 top-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors sm:left-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      <div className="w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold">
            Masuk ke <span className="gradient-text">ProfKu</span>
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Masuk untuk menyimpan ulasan dan melacak dosen favoritmu
          </p>
        </div>

        {/* Login Form (Stub) */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Alamat Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              className="h-11 rounded-xl bg-card/60"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Kata Sandi
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 rounded-xl bg-card/60"
              disabled
            />
          </div>

          <Button
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold"
            disabled
          >
            Masuk
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card/60 px-3 text-muted-foreground rounded">
                atau
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-11 rounded-xl border-border/60"
            disabled
          >
            Lanjutkan dengan Google
          </Button>

          <p className="text-center text-xs text-muted-foreground pt-2">
            Belum punya akun?{" "}
            <span className="text-primary font-medium">Daftar</span>
          </p>

          {/* Coming Soon Notice */}
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
            <p className="text-xs text-primary">
              🚧 Fitur autentikasi akan segera hadir. Saat ini kamu bisa
              langsung menulis ulasan tanpa akun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
