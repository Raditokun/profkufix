"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/cari?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative hero-gradient overflow-hidden">
      {/* Decorative floating elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute top-20 left-[15%] h-2 w-2 rounded-full bg-primary/30" />
        <div
          className="animate-float absolute top-40 right-[20%] h-3 w-3 rounded-full bg-chart-2/25"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="animate-float absolute bottom-32 left-[30%] h-2.5 w-2.5 rounded-full bg-chart-3/20"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
        {/* Badge */}
        <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Platform Ulasan Dosen #1 di Indonesia
        </div>

        {/* Headline */}
        <h1
          className="animate-slide-up text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "0.1s" }}
        >
          Temukan Dosen Terbaik
          <br />
          <span className="gradient-text">di Kampusmu</span>
        </h1>

        {/* Subheadline */}
        <p
          className="animate-slide-up mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          Baca ulasan jujur dari mahasiswa, bandingkan rating dosen, dan
          rencanakan semester terbaikmu.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="animate-slide-up mx-auto mt-10 max-w-lg"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="group relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              type="text"
              placeholder="Cari nama dosen atau universitas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 rounded-2xl border-border/60 bg-card/80 pl-12 pr-4 text-base shadow-lg backdrop-blur-sm transition-all placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:shadow-primary/10"
              id="hero-search-input"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground/70">
            Contoh: &quot;Budi Sulistyo&quot;, &quot;ITS&quot;, &quot;Teknik Informatika&quot;
          </p>
        </form>
      </div>
    </section>
  );
}
