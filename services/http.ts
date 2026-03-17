import { API_URL } from "@/lib/env";

async function request(path: string, options: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
    },
  });
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const response = await request(path, options);

  // Access token can expire while refresh token is still valid.
  if (response.status !== 401 || path === "/refresh") {
    return response;
  }

  const refreshResponse = await request("/refresh", { method: "POST" });
  if (!refreshResponse.ok) {
    return response;
  }

  return request(path, options);
}
