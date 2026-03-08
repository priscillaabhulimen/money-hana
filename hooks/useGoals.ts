import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
  GoalPayload,
} from "@/services/goals";
import { Goal } from "@/types";

function parseGoal(g: Goal): Goal {
  return {
    ...g,
    current_spend: Number(g.current_spend),
    monthly_limit: Number(g.monthly_limit),
  };
}

export const goalKeys = {
  all: ["goals"] as const,
  list: () => ["goals", "list"] as const,
};

export function useGoals() {
  return useQuery({
    queryKey: goalKeys.list(),
    queryFn: async () => {
      const result = await getGoals();
      return {
        ...result,
        data: result.data.map(parseGoal),
      };
    },
  });
}

export function useAddGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GoalPayload) => addGoal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Pick<GoalPayload, "monthly_limit"> }) =>
      updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}
