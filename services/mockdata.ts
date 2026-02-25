// mockdata.ts

import { Transaction, Goal, AIInsight } from "../types";

export const transactions: Transaction[] = [
  {
    id: 1,
    user_id: 1,
    amount: 1450,
    category: "Other",
    note: "January apartment rent",
    date: "2026-01-01",
    created_at: "2026-01-01T09:00:00Z",
  },
  {
    id: 2,
    user_id: 1,
    amount: 84.32,
    category: "Groceries",
    note: "Weekly groceries - Safeway",
    date: "2026-01-04",
    created_at: "2026-01-04T18:42:00Z",
  },
  {
    id: 3,
    user_id: 1,
    amount: 52.1,
    category: "Transport",
    note: "Gas refill",
    date: "2026-01-06",
    created_at: "2026-01-06T07:55:00Z",
  },
  {
    id: 4,
    user_id: 1,
    amount: 27.5,
    category: "Dining",
    note: "Lunch with coworkers",
    date: "2026-01-08",
    created_at: "2026-01-08T13:15:00Z",
  },
  {
    id: 5,
    user_id: 1,
    amount: 16.99,
    category: "Entertainment",
    note: "Movie ticket",
    date: "2026-01-09",
    created_at: "2026-01-09T20:10:00Z",
  },
  {
    id: 6,
    user_id: 1,
    amount: 120,
    category: "Income",
    note: "Freelance design payment",
    date: "2026-01-10",
    created_at: "2026-01-10T09:00:00Z",
  },
  {
    id: 7,
    user_id: 1,
    amount: 63.48,
    category: "Groceries",
    note: "Trader Joe's groceries",
    date: "2026-01-12",
    created_at: "2026-01-12T17:30:00Z",
  },
  {
    id: 8,
    user_id: 1,
    amount: 89.6,
    category: "Dining",
    note: "Dinner at Italian restaurant",
    date: "2026-01-14",
    created_at: "2026-01-14T21:05:00Z",
  },
  {
    id: 9,
    user_id: 1,
    amount: 45,
    category: "Transport",
    note: "Monthly subway pass",
    date: "2026-01-15",
    created_at: "2026-01-15T08:00:00Z",
  },
  {
    id: 10,
    user_id: 1,
    amount: 1400,
    category: "Income",
    note: "January salary (partial)",
    date: "2026-01-20",
    created_at: "2026-01-20T09:00:00Z",
  },
  {
    id: 11,
    user_id: 1,
    amount: 38.75,
    category: "Entertainment",
    note: "Streaming & game subscription",
    date: "2026-01-22",
    created_at: "2026-01-22T19:20:00Z",
  },
];

export const goals: Goal[] = [
  {
    id: 1,
    user_id: 1,
    category: "Groceries",
    monthly_limit: 400,
    current_spend: 147.8,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: 2,
    user_id: 1,
    category: "Dining",
    monthly_limit: 250,
    current_spend: 117.1,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: 3,
    user_id: 1,
    category: "Entertainment",
    monthly_limit: 150,
    current_spend: 55.74,
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const aiInsights: AIInsight[] = [
  {
    id: 1,
    type: "goal_warning",
    message:
      "You've spent 47% of your Dining budget in the first half of the month.",
    created_at: "2026-01-15T09:30:00Z",
  },
  {
    id: 2,
    type: "pattern",
    message:
      "Your grocery spending trend shows a slight increase compared to last month.",
    created_at: "2026-01-18T10:15:00Z",
  },
  {
    id: 3,
    type: "flag",
    message:
      "Transport expenses are higher than your usual weekly average.",
    created_at: "2026-01-22T08:45:00Z",
  },
];