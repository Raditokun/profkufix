import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-semibold">ProfKu</span>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Tentang</span>
            <span>Kontak</span>
            <span>Kebijakan Privasi</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © 2026 ProfKu. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
