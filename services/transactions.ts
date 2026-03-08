import { Transaction } from "../types";

const ROWS_PER_PAGE = 30;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function getTransactions(page: number): Promise<Transaction[]> {
  try {
    const response = await fetch(`${API_URL}/transactions?limit=${ROWS_PER_PAGE}&page=${page}`);
    const data = await response.json();
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function addTransaction(data: Omit<Transaction, "id" | "user_id" | "created_at">): Promise<Transaction> {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData ? JSON.parse(responseData) : {} as Transaction;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {} as Transaction;
  }
  
}

// export function deleteTransaction(id: string): Transaction | undefined {
//   const index = transactions.findIndex((t) => t.id === id);
//   if (index === -1) return undefined;
//   const deletedTransaction = transactions[index];
//   transactions.splice(index, 1);
//   return deletedTransaction;
// }

// export function updateTransaction(
//   id: string,
//   data: Partial<Omit<Transaction, "id" | "user_id" | "created_at">>
// ): Transaction | undefined {
//   const index = transactions.findIndex((t) => t.id === id);
//   if (index === -1) return undefined;
//   transactions[index] = { ...transactions[index], ...data };
//   return transactions[index];
// }