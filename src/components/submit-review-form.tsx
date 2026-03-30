"use client";

import { useState } from "react";
import { submitReview } from "@/app/actions/submit-review";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const TAGS = [
  "Inspiratif",
  "Asyik",
  "Materinya Berat",
  "Sering Telat",
  "Tepat Waktu",
  "Pelit Nilai",
  "Murah Hati",
  "Banyak Tugas",
  "Open Book",
  "Wajib Absen",
  "Responsif",
  "Sulit Dihubungi",
];

const GRADES = ["A", "AB", "B", "BC", "C", "D", "E", "Tidak Ingat"];
const SEMESTERS = ["Ganjil", "Genap"];

export function SubmitReviewForm({ professorId }: { professorId: string }) {
  const [rating, setRating] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [wouldTakeAgain, setWouldTakeAgain] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bodyText, setBodyText] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        // Append all selected tags to formData as multiple 'tags' entries
        selectedTags.forEach((tag) => formData.append("tags", tag));
        await submitReview(formData);
        setIsSubmitting(false); // Only reached if nav/redirect fails, otherwise page unmounts
      }}
      className="space-y-8 glass p-6 sm:p-10 rounded-3xl mt-8"
    >
      <input type="hidden" name="professor_id" value={professorId} />
      
      {/* Honeypot Field - Hidden for real users */}
      <input
        type="text"
        name="bot_field"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Row 1: Course Info */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="course_name_raw" className="text-sm font-semibold text-foreground">
            Mata Kuliah <span className="text-red-500">*</span>
          </label>
          <Input
            id="course_name_raw"
            name="course_name_raw"
            placeholder="Contoh: Algoritma dan Struktur Data"
            required
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="author_alias" className="text-sm font-semibold text-foreground">
            Nama / Alias Anda (Opsional)
          </label>
          <Input
            id="author_alias"
            name="author_alias"
            placeholder="Mahasiswa Anonim"
            className="bg-background/50"
          />
        </div>
      </div>

      {/* Metric Sliders (1-5 Buttons) */}
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Rating */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground flex justify-between">
            <span>Kualitas Keseluruhan <span className="text-red-500">*</span></span>
            <span className="text-muted-foreground font-normal text-xs uppercase">
              1 = Buruk, 5 = Sempurna
            </span>
          </label>
          <input type="hidden" name="rating" value={rating || ""} required />
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={`rating-${val}`}
                type="button"
                onClick={() => setRating(val)}
                className={cn(
                  "h-12 rounded-xl border border-border/50 font-bold transition-all",
                  rating === val
                    ? val <= 2
                      ? "bg-red-500/20 text-red-500 border-red-500/50"
                      : val === 3
                      ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
                      : "bg-green-500/20 text-green-500 border-green-500/50"
                    : "bg-card/40 text-muted-foreground hover:bg-card hover:border-border"
                )}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground flex justify-between">
            <span>Tingkat Kesulitan <span className="text-red-500">*</span></span>
            <span className="text-muted-foreground font-normal text-xs uppercase">
              1 = Sangat Mudah, 5 = Sangat Sulit
            </span>
          </label>
          <input type="hidden" name="difficulty" value={difficulty || ""} required />
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={`diff-${val}`}
                type="button"
                onClick={() => setDifficulty(val)}
                className={cn(
                  "h-12 rounded-xl border border-border/50 font-bold transition-all",
                  difficulty === val
                    ? val >= 4
                      ? "bg-red-500/20 text-red-500 border-red-500/50"
                      : val === 3
                      ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
                      : "bg-green-500/20 text-green-500 border-green-500/50"
                    : "bg-card/40 text-muted-foreground hover:bg-card hover:border-border"
                )}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Would Take Again & Grade & Semester */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Would Take Again */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">
            Saran Mengambil Lagi? <span className="text-red-500">*</span>
          </label>
          <input
            type="hidden"
            name="would_take_again"
            value={wouldTakeAgain !== null ? String(wouldTakeAgain) : ""}
            required
          />
          <div className="flex gap-3 h-12">
            <button
              type="button"
              onClick={() => setWouldTakeAgain(true)}
              className={cn(
                "flex-1 rounded-xl font-bold border border-border/50 transition-all",
                wouldTakeAgain === true
                  ? "bg-green-500/20 text-green-500 border-green-500/50"
                  : "bg-card/40 text-muted-foreground hover:bg-card"
              )}
            >
              Ya
            </button>
            <button
              type="button"
              onClick={() => setWouldTakeAgain(false)}
              className={cn(
                "flex-1 rounded-xl font-bold border border-border/50 transition-all",
                wouldTakeAgain === false
                  ? "bg-red-500/20 text-red-500 border-red-500/50"
                  : "bg-card/40 text-muted-foreground hover:bg-card"
              )}
            >
              Tidak
            </button>
          </div>
        </div>

        {/* Grade */}
        <div className="space-y-2">
          <label htmlFor="grade_received" className="text-sm font-semibold text-foreground">
            Nilai Akhir
          </label>
          <select
            id="grade_received"
            name="grade_received"
            className="flex h-12 w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Pilih Nilai</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Semester */}
        <div className="space-y-2">
          <label htmlFor="semester" className="text-sm font-semibold text-foreground">
            Semester
          </label>
          <select
            id="semester"
            name="semester"
            className="flex h-12 w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Pilih Semester</option>
            {SEMESTERS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tags Multi-select */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">
          Pilih Hingga 3 Karakteristik (Opsional)
        </label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                disabled={!isSelected && selectedTags.length >= 3}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border/50",
                  !isSelected && selectedTags.length >= 3 && "opacity-50 cursor-not-allowed border-transparent"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Review Body */}
      <div className="space-y-2 pb-4">
        <label htmlFor="body" className="text-sm font-semibold text-foreground flex justify-between">
          <span>Tuliskan Ulasan Anda <span className="text-red-500">*</span></span>
          <span className={cn("text-xs", bodyText.length < 20 || bodyText.length > 500 ? "text-red-400" : "text-muted-foreground")}>
            {bodyText.length}/500 karakter
          </span>
        </label>
        <Textarea
          id="body"
          name="body"
          required
          minLength={20}
          maxLength={500}
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          placeholder="Bagaimana pengalaman Anda belajar di kelas ini? (minimal 20 karakter)"
          className="min-h-[140px] resize-y bg-background/50"
        />
        {bodyText.length > 0 && bodyText.length < 20 && (
          <p className="text-xs text-red-400">Ulasan terlalu pendek, tambahkan detail lebih lanjut.</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !rating || !difficulty || wouldTakeAgain === null || bodyText.length < 20 || bodyText.length > 500}
        className="w-full h-14 text-lg font-bold glow"
      >
        {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
      </Button>
    </form>
  );
}
