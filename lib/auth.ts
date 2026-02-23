import { cookies } from "next/headers";

const COOKIE_NAME = "kbank_admin";

export function isAdminAuthenticated() {
  return cookies().get(COOKIE_NAME)?.value === "1";
}

export function setAdminSession() {
  cookies().set(COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
}
