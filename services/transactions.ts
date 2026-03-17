import { Transaction, ApiResponse, PaginatedResponse } from "@/types";
import { apiFetch } from "@/services/http";

const ROWS_PER_PAGE = 30;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
}

export async function getTransactions(page: number, startDate?: string, endDate?: string) {
  const params = new URLSearchParams({
    limit: String(ROWS_PER_PAGE),
    page: String(page),
  });
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);

  const response = await apiFetch(`/transactions?${params}`, {
    cache: "no-store",
  });
  return handleResponse<PaginatedResponse<Transaction[]>>(response);
}

export async function getTransaction(id: string) {
  const response = await apiFetch(`/transactions/${id}`, {
    cache: "no-store",
  });
  return handleResponse<ApiResponse<Transaction>>(response);
}

export type TransactionPayload = {
  transaction_type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  note?: string;
};

export async function addTransaction(data: TransactionPayload) {
  const response = await apiFetch("/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ApiResponse<Transaction>>(response);
}

export async function updateTransaction(id: string, data: Partial<TransactionPayload>) {
  const response = await apiFetch(`/transactions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ApiResponse<Transaction>>(response);
}

export async function deleteTransaction(id: string) {
  const response = await apiFetch(`/transactions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "An error occurred");
  }
}

export { ROWS_PER_PAGE };
