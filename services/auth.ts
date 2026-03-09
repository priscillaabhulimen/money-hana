import { API_URL } from "@/lib/env";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
}

function authFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include", // sends/receives httponly cookies automatically
    headers: { "Content-Type": "application/json", ...options.headers },
  });
}

export async function registerUser(payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  const res = await authFetch("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await authFetch("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse<{ data: { id: string; first_name: string; last_name: string; email: string } }>(res);
}

export async function logoutUser() {
  const res = await authFetch("/logout", { method: "POST" });
  return handleResponse(res);
}

export async function refreshSession() {
  const res = await authFetch("/refresh", { method: "POST" });
  return handleResponse(res);
}

export async function verifyEmail(token: string) {
  const res = await authFetch("/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
  return handleResponse(res);
}

export async function resendVerification(email: string) {
  const res = await authFetch("/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
}