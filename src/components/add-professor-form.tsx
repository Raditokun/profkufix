"use client";

import { useState } from "react";
import { submitProfessor } from "@/app/actions/submit-professor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddProfessorForm({ taxonomy }: { taxonomy: any[] }) {
  const [selectedUniv, setSelectedUniv] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derive cascaded lists
  const activeUniv = taxonomy.find((u) => u.id === selectedUniv);
  const faculties = activeUniv?.faculties || [];

  const activeFaculty = faculties.find((f: any) => f.id === selectedFaculty);
  const departments = activeFaculty?.departments || [];

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        await submitProfessor(formData);
        setIsSubmitting(false); // Only runs if redirect fails
      }}
      className="space-y-6 glass p-6 sm:p-10 rounded-3xl"
    >
      <div className="space-y-2">
        <label htmlFor="full_name" className="text-sm font-semibold text-foreground">
          Nama Lengkap (Tanpa Gelar) <span className="text-red-500">*</span>
        </label>
        <Input
          id="full_name"
          name="full_name"
          required
          placeholder="Contoh: Budi Santoso"
          className="bg-background/50 h-12"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-semibold text-foreground">
          Gelar Lengkap (Opsional)
        </label>
        <Input
          id="title"
          name="title"
          placeholder="Contoh: Dr., S.Kom., M.T."
          className="bg-background/50 h-12"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* University Selection */}
        <div className="space-y-2">
          <label htmlFor="university" className="text-sm font-semibold text-foreground">
            Universitas <span className="text-red-500">*</span>
          </label>
          <select
            id="university"
            required
            className="flex h-12 w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm shadow-sm"
            value={selectedUniv}
            onChange={(e) => {
              setSelectedUniv(e.target.value);
              setSelectedFaculty(""); // Reset children
            }}
          >
            <option value="">Pilih Institusi...</option>
            {taxonomy.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} {u.short_name && `(${u.short_name})`}
              </option>
            ))}
          </select>
        </div>

        {/* Faculty Selection */}
        <div className="space-y-2">
          <label htmlFor="faculty" className="text-sm font-semibold text-foreground">
            Fakultas <span className="text-red-500">*</span>
          </label>
          <select
            id="faculty"
            required
            className="flex h-12 w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm shadow-sm"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            disabled={!selectedUniv}
          >
            <option value="">Pilih Fakultas...</option>
            {faculties.map((f: any) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Department Selection */}
      <div className="space-y-2 pb-4">
        <label htmlFor="department_id" className="text-sm font-semibold text-foreground">
          Program Studi <span className="text-red-500">*</span>
        </label>
        <select
          id="department_id"
          name="department_id"
          required
          className="flex h-12 w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm shadow-sm"
          disabled={!selectedFaculty}
        >
          <option value="">Pilih Program Studi...</option>
          {departments.map((d: any) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !selectedUniv || !selectedFaculty}
        className="w-full h-14 text-lg font-bold glow"
      >
        {isSubmitting ? "Mengirim..." : "Ajukan Dosen"}
      </Button>
    </form>
  );
}
