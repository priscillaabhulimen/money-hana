const API = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
}

function authFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API}${path}`, {
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
  const res = await authFetch("/api/v1/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await authFetch("/api/v1/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse<{ data: { id: string; first_name: string; last_name: string; email: string } }>(res);
}

export async function logoutUser() {
  const res = await authFetch("/api/v1/logout", { method: "POST" });
  return handleResponse(res);
}

export async function refreshSession() {
  const res = await authFetch("/api/v1/refresh", { method: "POST" });
  return handleResponse(res);
}

export async function verifyEmail(token: string) {
  const res = await authFetch("/api/v1/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
  return handleResponse(res);
}

export async function resendVerification(email: string) {
  const res = await authFetch("/api/v1/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
}