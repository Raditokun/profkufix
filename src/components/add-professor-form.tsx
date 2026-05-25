"use client";

import { useState } from "react";
import { submitProfessor } from "@/app/actions/submit-professor";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Taxonomy = any[];

export function AddProfessorForm({ taxonomy }: { taxonomy: Taxonomy }) {
  const [selectedUniv, setSelectedUniv] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeUniv = taxonomy.find((u) => u.id === selectedUniv);
  const faculties = activeUniv?.faculties || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeFaculty = faculties.find((f: any) => f.id === selectedFaculty);
  const departments = activeFaculty?.departments || [];

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        await submitProfessor(formData);
        setIsSubmitting(false);
      }}
      style={{
        background: "var(--pk-paper)",
        borderRadius: 30,
        border: "1px solid var(--pk-line)",
        padding: "40px clamp(24px, 5vw, 48px)",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <LabeledField label="Nama Lengkap (tanpa gelar) *">
        <TextInput
          name="full_name"
          required
          placeholder="Contoh: Budi Santoso"
        />
      </LabeledField>

      <LabeledField label="Gelar Lengkap (opsional)">
        <TextInput
          name="title"
          placeholder="Contoh: Dr., S.Kom., M.T."
        />
      </LabeledField>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        <LabeledField label="Universitas *">
          <SelectInput
            required
            value={selectedUniv}
            onChange={(e) => {
              setSelectedUniv(e.target.value);
              setSelectedFaculty("");
            }}
          >
            <option value="">Pilih Institusi…</option>
            {taxonomy.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} {u.short_name && `(${u.short_name})`}
              </option>
            ))}
          </SelectInput>
        </LabeledField>

        <LabeledField label="Fakultas *">
          <SelectInput
            required
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            disabled={!selectedUniv}
          >
            <option value="">Pilih Fakultas…</option>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {faculties.map((f: any) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </SelectInput>
        </LabeledField>
      </div>

      <LabeledField label="Program Studi *">
        <SelectInput
          name="department_id"
          required
          disabled={!selectedFaculty}
        >
          <option value="">Pilih Program Studi…</option>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {departments.map((d: any) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </SelectInput>
      </LabeledField>

      <button
        type="submit"
        disabled={isSubmitting || !selectedFaculty}
        className="pk-cta-black"
        style={{
          alignSelf: "center",
          marginTop: 8,
          background:
            isSubmitting || !selectedFaculty
              ? "rgba(14,3,3,0.3)"
              : "var(--pk-ink)",
          color: "var(--pk-paper)",
          border: 0,
          height: 64,
          padding: "0 64px",
          borderRadius: 9999,
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: "0.04em",
          boxShadow:
            isSubmitting || !selectedFaculty
              ? "none"
              : "var(--pk-shadow-2)",
          cursor:
            isSubmitting || !selectedFaculty ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? "MENGIRIM…" : "AJUKAN DOSEN"}
      </button>
    </form>
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
        height: 56,
        background: "var(--pk-paper)",
        border: "1px solid var(--pk-ink)",
        borderRadius: 18,
        padding: "0 20px",
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
        height: 56,
        background: props.disabled ? "var(--pk-rose-200)" : "var(--pk-paper)",
        border: "1px solid var(--pk-ink)",
        borderRadius: 18,
        padding: "0 20px",
        fontFamily: "var(--pk-font-ui)",
        fontWeight: 600,
        fontSize: 16,
        color: "var(--pk-ink)",
        outline: "none",
        cursor: props.disabled ? "not-allowed" : "pointer",
        opacity: props.disabled ? 0.6 : 1,
      }}
    >
      {children}
    </select>
  );
}
