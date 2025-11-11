import { cookies } from "next/headers";

export async function getSession() {
  const token = cookies().get("auth_token")?.value;

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}
