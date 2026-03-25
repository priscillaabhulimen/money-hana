import { Goal, ApiResponse } from "@/types";
import { apiFetch, handleResponse } from "@/services/http";


export async function getGoals() {
  const response = await apiFetch("/goals", {
    cache: "no-store",
  });
  return handleResponse<ApiResponse<Goal[]>>(response);
}

export async function getGoal(id: string) {
  const response = await apiFetch(`/goals/${id}`, {
    cache: "no-store",
  });
  return handleResponse<ApiResponse<Goal>>(response);
}

export type GoalPayload = {
  category: string;
  monthly_limit: number;
};

export async function addGoal(data: GoalPayload) {
  const response = await apiFetch("/goals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ApiResponse<Goal>>(response);
}

export async function updateGoal(id: string, data: Pick<GoalPayload, "monthly_limit">) {
  const response = await apiFetch(`/goals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ApiResponse<Goal>>(response);
}

export async function deleteGoal(id: string) {
  const response = await apiFetch(`/goals/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "An error occurred");
  }
}
