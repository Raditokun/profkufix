"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function submitReview(formData: FormData) {
  const professorId = formData.get("professor_id") as string;
  const botField = formData.get("bot_field") as string;
  
  // 1. Honeypot check for bots
  if (botField) {
    console.log("Bot detected via honeypot field");
    return { success: true }; // Silently "succeed" for bots
  }

  // 2. IP-based rate limiting mock
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknown-ip";
  // In a real app we would cache this IP with a timestamp (e.g., Redis/KV)
  // to prevent rapid-fire requests. We'll skip complex KV for this MVP.

  // 3. Extract and parse fields
  const courseNameRaw = formData.get("course_name_raw") as string;
  const ratingStr = formData.get("rating") as string;
  const difficultyStr = formData.get("difficulty") as string;
  const wouldTakeAgainStr = formData.get("would_take_again") as string;
  const gradeReceived = formData.get("grade_received") as string;
  const semesterStr = formData.get("semester") as string;
  const body = formData.get("body") as string;
  const authorAlias = (formData.get("author_alias") as string) || "Mahasiswa Anonim";
  
  // Tags array handling (multi-select)
  const tags = formData.getAll("tags") as string[];

  // Validation
  const rating = parseInt(ratingStr, 10);
  const difficulty = parseInt(difficultyStr, 10);
  
  if (!professorId || !courseNameRaw || !body || isNaN(rating) || isNaN(difficulty)) {
    return { error: "Semua kolom wajib harus diisi." };
  }

  if (body.trim().length < 20 || body.trim().length > 500) {
    return { error: "Panjang ulasan harus antara 20 hingga 500 karakter." };
  }

  if (rating < 1 || rating > 5 || difficulty < 1 || difficulty > 5) {
    return { error: "Nilai rating dan kesulitan harus antara 1 dan 5." };
  }

  const wouldTakeAgain = wouldTakeAgainStr === "true";
  
  let semester = null;
  if (semesterStr === "Ganjil" || semesterStr === "Genap") {
    semester = semesterStr;
  }

  let grade = gradeReceived && gradeReceived !== "Tidak Ingat" ? gradeReceived : null;

  // 4. Insert into database
  const { error } = await supabase.from("reviews").insert({
    professor_id: professorId,
    course_name_raw: courseNameRaw,
    rating,
    difficulty,
    would_take_again: wouldTakeAgain,
    grade_received: grade,
    semester: semester,
    body: body,
    author_alias: authorAlias,
    tags: tags.length > 0 ? tags : null,
  });

  if (error) {
    console.error("Supabase Insert Error:", error);
    return { error: "Gagal mengirim ulasan. Silakan coba lagi." };
  }

  // 5. Revalidate and Redirect
  revalidatePath(`/dosen/${professorId}`);
  redirect(`/dosen/${professorId}`);
}
