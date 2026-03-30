"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function submitProfessor(formData: FormData) {
  const fullName = formData.get("full_name") as string;
  const title = formData.get("title") as string;
  const departmentId = formData.get("department_id") as string;
  
  // Basic validation
  if (!fullName || !departmentId) {
    return { error: "Semua kolom wajib harus diisi." };
  }

  // Insert into database with status 'pending'
  const { data, error } = await supabase.from("professors").insert({
    full_name: fullName,
    title: title || null,
    department_id: departmentId,
    status: "pending", // Pending review by admin
  }).select().single();

  if (error) {
    console.error("Supabase Insert Error:", error);
    return { error: "Gagal mengirim data dosen. Silakan coba lagi." };
  }

  // Redirect to success state or their new pending profile
  redirect(`/dosen/${data.id}?pending=true`);
}
