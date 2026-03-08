import { Goal, ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
}

export async function getGoals() {
  const response = await fetch(`${API_URL}/goals`, { cache: "no-store" });
  return handleResponse<ApiResponse<Goal[]>>(response);
}

export async function getGoal(id: string) {
  const response = await fetch(`${API_URL}/goals/${id}`, { cache: "no-store" });
  return handleResponse<ApiResponse<Goal>>(response);
}

export type GoalPayload = {
  category: string;
  monthly_limit: number;
};

export async function addGoal(data: GoalPayload) {
  const response = await fetch(`${API_URL}/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ApiResponse<Goal>>(response);
}

export async function updateGoal(id: string, data: Pick<GoalPayload, "monthly_limit">) {
  const response = await fetch(`${API_URL}/goals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ApiResponse<Goal>>(response);
}

export async function deleteGoal(id: string) {
  const response = await fetch(`${API_URL}/goals/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "An error occurred");
  }
}
