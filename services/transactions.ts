// TODO Week 3: replace with fetch() call to FastAPI

import { transactions } from './mockdata';
import { Transaction } from "../types";

export function getTransactions(): Transaction[] {
  return transactions;
}

export function addTransaction(data: Omit<Transaction, "id" | "user_id" | "created_at">): Transaction {
  const newTransaction: Transaction = {
    id: (transactions.length + 1).toString(),
    user_id: "1", // hardcoded for now
    created_at: new Date().toISOString(),
    ...data,
  };
  transactions.push(newTransaction);
  return newTransaction;
}

export function deleteTransaction(id: string): Transaction | undefined {
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  const deletedTransaction = transactions[index];
  transactions.splice(index, 1);
  return deletedTransaction;
}

export function updateTransaction(
  id: string,
  data: Partial<Omit<Transaction, "id" | "user_id" | "created_at">>
): Transaction | undefined {
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  transactions[index] = { ...transactions[index], ...data };
  return transactions[index];
}