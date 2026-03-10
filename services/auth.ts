import { ApiResponse, User } from "@/types";
import { apiFetch } from "@/services/http";

type ApiUser = {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  is_verified: boolean;
  user_type: string;
  created_at: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
}

function toUser(user: ApiUser): User {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email_address,
    isVerified: user.is_verified,
  };
}

function authFetch(path: string, options: RequestInit = {}) {
  return apiFetch(path, {
    ...options,
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
  const result = await handleResponse<ApiResponse<ApiUser>>(res);
  return {
    ...result,
    data: toUser(result.data),
  };
}

export async function getCurrentUser() {
  const res = await authFetch("/me", {
    method: "GET",
    cache: "no-store",
  });
  const result = await handleResponse<ApiResponse<ApiUser>>(res);
  return {
    ...result,
    data: toUser(result.data),
  };
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