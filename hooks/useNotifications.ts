import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, confirmPayment, dismissPayment } from "@/services/subscriptions";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const result = await getNotifications();
      return result.data;
    },
  });
}

export function useConfirmPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

export function useDismissPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dismissPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}