import { apiFetch } from "@/services/http";
import { Subscription } from "@/types";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
}

export async function getNotifications() {
  const res = await apiFetch("/api/v1/notifications", { method: "GET" });
  return handleResponse<{ data: Subscription[] }>(res);
}

export async function confirmPayment(subscriptionId: string) {
  const res = await apiFetch(`/api/v1/notifications/${subscriptionId}/confirm`, {
    method: "POST",
  });
  return handleResponse(res);
}

export async function dismissPayment(subscriptionId: string) {
  const res = await apiFetch(`/api/v1/notifications/${subscriptionId}/dismiss`, {
    method: "POST",
  });
  return handleResponse(res);
}