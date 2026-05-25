"use client";

import { useState } from "react";
import { submitReview } from "@/app/actions/submit-review";
import { PersonalityTags, type Tag } from "@/components/personality-tags";

const TAGS_AVAILABLE: Tag[] = [
  { label: "Inspiratif", tone: "good" },
  { label: "Asyik", tone: "good" },
  { label: "Killer", tone: "bad" },
  { label: "Strict Grader", tone: "warn" },
  { label: "Materinya Berat", tone: "bad" },
  { label: "Beban Tugas Ringan", tone: "good" },
  { label: "Pelit Nilai", tone: "warn" },
  { label: "Murah Hati", tone: "good" },
  { label: "Banyak Tugas", tone: "warn" },
  { label: "Open Book", tone: "info" },
  { label: "Wajib Absen", tone: "info" },
  { label: "Sering Telat", tone: "warn" },
  { label: "Tepat Waktu", tone: "good" },
  { label: "Responsif", tone: "info" },
  { label: "Sulit Dihubungi", tone: "bad" },
  { label: "Supportif", tone: "info" },
];

const GRADES = ["A", "AB", "B", "BC", "C", "D", "E", "Tidak Ingat"];
const SEMESTERS = ["Ganjil", "Genap"];

const RATE_COLORS = [
  "var(--pk-rate-1)",
  "var(--pk-rate-2)",
  "var(--pk-rate-3)",
  "var(--pk-rate-4)",
  "var(--pk-rate-5)",
];

export function SubmitReviewForm({ professorId }: { professorId: string }) {
  const [rating, setRating] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [wouldTakeAgain, setWouldTakeAgain] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bodyText, setBodyText] = useState("");

  const canSubmit =
    !isSubmitting &&
    rating > 0 &&
    difficulty > 0 &&
    wouldTakeAgain !== null &&
    bodyText.trim().length >= 20 &&
    bodyText.trim().length <= 500;

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        selectedTags.forEach((tag) => formData.append("tags", tag));
        await submitReview(formData);
        setIsSubmitting(false);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        marginTop: 24,
      }}
    >
      <input type="hidden" name="professor_id" value={professorId} />
      <input
        type="text"
        name="bot_field"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px" }}
      />
      <input
        type="hidden"
        name="rating"
        value={rating || ""}
        required
      />
      <input
        type="hidden"
        name="difficulty"
        value={difficulty || ""}
        required
      />
      <input
        type="hidden"
        name="would_take_again"
        value={wouldTakeAgain !== null ? String(wouldTakeAgain) : ""}
        required
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        <Section title="Seberapa susah kelasnya?">
          <FiveScale value={difficulty} onChange={setDifficulty} />
        </Section>
        <Section title="Rate Dosennya">
          <FiveScale value={rating} onChange={setRating} />
        </Section>
        <Section title="Mau Diajar Beliau Lagi?">
          <YesNo
            value={wouldTakeAgain}
            onChange={setWouldTakeAgain}
          />
        </Section>
      </div>

      <Section title="Detail Mata Kuliah">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <LabeledField label="Mata Kuliah *">
            <TextInput
              name="course_name_raw"
              required
              placeholder="Algoritma dan Struktur Data"
            />
          </LabeledField>
          <LabeledField label="Nama / Alias (opsional)">
            <TextInput
              name="author_alias"
              placeholder="Mahasiswa Anonim"
            />
          </LabeledField>
          <LabeledField label="Nilai Akhir">
            <SelectInput name="grade_received">
              <option value="">Pilih Nilai</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </SelectInput>
          </LabeledField>
          <LabeledField label="Semester">
            <SelectInput name="semester">
              <option value="">Pilih Semester</option>
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectInput>
          </LabeledField>
        </div>
      </Section>

      <Section title="Pilih hingga 3 tag yang menggambarkan dosen ini">
        <div
          style={{
            background: "rgba(137,106,79,0.20)",
            borderRadius: 24,
            padding: "24px 32px",
          }}
        >
          <PersonalityTags
            tags={TAGS_AVAILABLE}
            selectable
            onChange={setSelectedTags}
            max={3}
          />
        </div>
      </Section>

      <Section title="Tulis review">
        <textarea
          name="body"
          required
          minLength={20}
          maxLength={500}
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          placeholder="Bagikan pengalaman jujurmu — anonim, dilihat ribuan calon mahasiswa…"
          style={{
            width: "100%",
            minHeight: 200,
            background: "var(--pk-paper)",
            borderRadius: 24,
            border: "1px solid var(--pk-ink)",
            padding: "20px 24px",
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 500,
            fontSize: 17,
            color: "var(--pk-ink)",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--pk-font-ui)",
              fontSize: 13,
              color: "var(--pk-fg-3)",
            }}
          >
            Review-mu publik tapi anonim — jangan sebut nama orang.
          </span>
          <span
            style={{
              fontFamily: "var(--pk-font-mono)",
              fontSize: 13,
              color:
                bodyText.length > 500 || bodyText.length < 20
                  ? "var(--pk-bad)"
                  : "var(--pk-fg-3)",
            }}
          >
            {bodyText.length} / 500
          </span>
        </div>
      </Section>

      <button
        type="submit"
        disabled={!canSubmit}
        className="pk-cta-black"
        style={{
          alignSelf: "center",
          marginTop: 8,
          background: canSubmit
            ? "var(--pk-ink)"
            : "rgba(14, 3, 3, 0.3)",
          color: "var(--pk-paper)",
          border: 0,
          height: 64,
          padding: "0 80px",
          borderRadius: 9999,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: "0.04em",
          boxShadow: canSubmit ? "0 6px 0 var(--pk-rose-700)" : "none",
          cursor: canSubmit ? "pointer" : "not-allowed",
        }}
      >
        {isSubmitting ? "MENGIRIM…" : "SUBMIT RATING"}
      </button>
    </form>
  );
}

function Section({
  title,
  children,
  bg = "var(--pk-rose-300)",
}: {
  title: string;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: 30,
        padding: "32px 40px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 800,
          fontSize: 24,
          color: "var(--pk-ink)",
          textAlign: "center",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function FiveScale({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const active = value === n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            style={{
              width: 72,
              height: 56,
              borderRadius: 18,
              background: active ? RATE_COLORS[n - 1] : "var(--pk-paper)",
              border: active
                ? "3px solid var(--pk-ink)"
                : "1px solid var(--pk-ink)",
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 800,
              fontSize: 26,
              color: active && n === 5 ? "#FFF" : "var(--pk-ink)",
              cursor: "pointer",
              transition: "transform 140ms var(--pk-ease)",
            }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

function YesNo({
  value,
  onChange,
  yes = "Ya",
  no = "Tidak",
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
  yes?: string;
  no?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 48,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Choice
        label={yes}
        active={value === true}
        onClick={() => onChange(true)}
      />
      <Choice
        label={no}
        active={value === false}
        onClick={() => onChange(false)}
      />
    </div>
  );
}

function Choice({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "transparent",
        border: 0,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: 0,
      }}
    >
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "var(--pk-paper)",
          border: "4px solid var(--pk-ink)",
          position: "relative",
          display: "inline-block",
        }}
      >
        {active && (
          <span
            style={{
              position: "absolute",
              inset: 5,
              borderRadius: "50%",
              background: "var(--pk-ink)",
            }}
          />
        )}
      </span>
      <span
        style={{
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 28,
          color: "var(--pk-ink)",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function LabeledField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontFamily: "var(--pk-font-ui)",
        fontWeight: 700,
        fontSize: 14,
        color: "var(--pk-ink)",
      }}
    >
      {label}
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      {...props}
      style={{
        height: 52,
        background: "var(--pk-paper)",
        border: "1px solid var(--pk-ink)",
        borderRadius: 18,
        padding: "0 18px",
        fontFamily: "var(--pk-font-ui)",
        fontWeight: 600,
        fontSize: 16,
        color: "var(--pk-ink)",
        outline: "none",
      }}
    />
  );
}

function SelectInput({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{
        height: 52,
        background: "var(--pk-paper)",
        border: "1px solid var(--pk-ink)",
        borderRadius: 18,
        padding: "0 18px",
        fontFamily: "var(--pk-font-ui)",
        fontWeight: 600,
        fontSize: 16,
        color: "var(--pk-ink)",
        outline: "none",
      }}
    >
      {children}
    </select>
  );
}
