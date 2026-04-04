import { apiFetch, handleResponse } from "@/services/http";
import { Subscription, ApiResponse } from "@/types";

export async function getNotifications() {
  const res = await apiFetch("/notifications", { method: "GET" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data as { data: Subscription[] };
}

export async function confirmPayment(subscriptionId: string) {
  const res = await apiFetch(`/notifications/${subscriptionId}/confirm`, { method: "POST" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
}

export async function dismissPayment(subscriptionId: string) {
  const res = await apiFetch(`/notifications/${subscriptionId}/dismiss`, { method: "POST" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
}

export async function getSubscriptions() {
  const response = await apiFetch("/subscriptions", { cache: "no-store" });
  return handleResponse<ApiResponse<Subscription[]>>(response);
}

export type SubscriptionPayload = {
  name: string;
  category: string;
  amount: number;
  description?: string;
  billing_type: "fixed_date" | "periodic";
  frequency: "weekly" | "monthly" | "yearly";
  anchor_day?: number | null;
  is_trial: boolean;
  trial_ends_at?: string | null;
};

export async function addSubscription(data: SubscriptionPayload) {
  const response = await apiFetch("/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ApiResponse<Subscription>>(response);
}

export async function updateSubscription(id: string, data: Partial<SubscriptionPayload>) {
  const response = await apiFetch(`/subscriptions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ApiResponse<Subscription>>(response);
}

export async function deleteSubscription(id: string) {
  const response = await apiFetch(`/subscriptions/${id}`, { method: "DELETE" });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "An error occurred");
  }
}