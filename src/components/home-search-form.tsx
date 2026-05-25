"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function HomeSearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/cari?q=${encodeURIComponent(q)}` : "/cari");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl flex items-center gap-2 p-2 rounded-2xl bg-white ring-1 ring-stone-200 shadow-lg shadow-emerald-900/10 focus-within:ring-2 focus-within:ring-emerald-600 transition"
    >
      <div className="pl-3 text-stone-400">
        <Search className="size-5" aria-hidden />
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari nama dosen atau universitas..."
        aria-label="Cari dosen atau universitas"
        className="flex-1 min-w-0 bg-transparent border-0 outline-none text-base text-stone-900 placeholder:text-stone-400 px-1 py-2"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center h-11 px-5 sm:px-6 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition shrink-0"
      >
        Cari
      </button>
    </form>
  );
}
