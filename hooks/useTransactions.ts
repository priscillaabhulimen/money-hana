import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  TransactionPayload,
} from "@/services/transactions";
import { Transaction } from "@/types";

function parseTransaction(t: Transaction): Transaction {
  return {
    ...t,
    amount: Number(t.amount),
  };
}

export const transactionKeys = {
  all: ["transactions"] as const,
  list: (page: number, startDate?: string, endDate?: string) =>
    ["transactions", "list", page, startDate, endDate] as const,
};

export function useTransactions(page: number, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: transactionKeys.list(page, startDate, endDate),
    queryFn: async () => {
      const result = await getTransactions(page, startDate, endDate);
      return {
        ...result,
        data: result.data.map(parseTransaction),
      };
    },
  });
}

export function useAddTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TransactionPayload) => addTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TransactionPayload> }) =>
      updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}
