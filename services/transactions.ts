// TODO Week 3: replace with fetch() call to FastAPI

import { transactions } from './mockdata';
import { Transaction } from "../types";

export function getTransactions(): Transaction[] {
  return transactions;
}

export function addTransaction(data: Omit<Transaction, "id" | "user_id" | "created_at">): Transaction {
  const newTransaction: Transaction = {
    ...data,
    id: transactions.length > 0 ? Math.max(...transactions.map((t) => t.id)) + 1 : 1,
    user_id: 1,
    created_at: new Date().toISOString(),
  };
  transactions.push(newTransaction);
  return newTransaction;
}

export function deleteTransaction(id: number) {
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  const deletedTransaction = transactions[index];
  transactions.splice(index, 1);
  return deletedTransaction;
}

export function updateTransaction(
  id: number,
  data: Partial<Omit<Transaction, "id" | "user_id" | "created_at">>
): Transaction | undefined {
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  transactions[index] = { ...transactions[index], ...data };
  return transactions[index];
}