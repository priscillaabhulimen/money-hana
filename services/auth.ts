const API = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
}

export async function registerUser(payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await fetch(`${API}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<{ data: { access_token: string } }>(res);
}

export async function verifyEmail(token: string) {
  const res = await fetch(`${API}/api/v1/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  return handleResponse(res);
}

export async function resendVerification(email: string) {
  const res = await fetch(`${API}/api/v1/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
}