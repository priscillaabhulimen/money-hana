// mockdata.ts

import { AIInsight } from "../types";

export const aiInsights: AIInsight[] = [
  {
    id: "1",
    type: "flag",
    message:
      "⚠️ Unusual spending detected — Dining: $343.45 this month vs. your $180 average. You've exceeded your $250 budget by $93.45.",
    created_at: "2026-02-28T09:30:00Z",
  },
  {
    id: "2",
    type: "pattern",
    message:
      "📊 68% of your discretionary spending happens on Fridays and Saturdays. Top categories: Dining (42%), Entertainment (18%), Transport (14%).",
    created_at: "2026-02-28T09:30:00Z",
  },
  {
    id: "3",
    type: "goal_warning",
    message:
      "🎯 Groceries: You've used $296.80 of your $400 monthly budget. You're on track with a comfortable $103.20 remaining.",
    created_at: "2026-02-28T09:30:00Z",
  },
];