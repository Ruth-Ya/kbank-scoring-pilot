"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, setAdminSession } from "@/lib/auth";

export async function loginAdmin(formData: FormData) {
  const pwd = String(formData.get("password") || "");
  if (pwd === process.env.KBANK_ADMIN_PASSWORD) {
    setAdminSession();
    redirect("/admin/export");
  }
  redirect("/admin?error=1");
}

export async function logoutAdmin() {
  clearAdminSession();
  redirect("/admin");
}
