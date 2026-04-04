import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  SubscriptionPayload,
} from "@/services/subscriptions";

export const subscriptionKeys = {
  all: ["subscriptions"] as const,
  list: () => ["subscriptions", "list"] as const,
};

export function useSubscriptions() {
  return useQuery({
    queryKey: subscriptionKeys.list(),
    queryFn: () => getSubscriptions(),
  });
}

export function useAddSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubscriptionPayload) => addSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SubscriptionPayload> }) =>
      updateSubscription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
  });
}

export function useDeleteSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
  });
}
