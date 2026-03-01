// TODO Week 3: replace with fetch() call to FastAPI

import { goals } from './mockdata';
import { Goal } from "../types";

export function getGoals(): Goal[] {
  return goals;
}

export function addGoal(data: Omit<Goal, "id" | "user_id" | "current_spend" | "created_at">): Goal {
  const newGoal: Goal = {
    ...data,
    id: goals.length > 0 ? Math.max(...goals.map((g) => g.id)) + 1 : 1,
    user_id: 1,
    current_spend: 0,
    created_at: new Date().toISOString(),
  };
  goals.push(newGoal);
  return newGoal;
}

export function updateGoal(
  id: number,
  data: Partial<Omit<Goal, "id" | "user_id" | "current_spend" | "created_at">>
): Goal | undefined {
  const index = goals.findIndex((g) => g.id === id);
  if (index === -1) return undefined;
  goals[index] = { ...goals[index], ...data };
  return goals[index];
}

export function deleteGoal(id: number): void {
  const index = goals.findIndex((g) => g.id === id);
  if (index !== -1) goals.splice(index, 1);
}