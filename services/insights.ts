import { AIInsight } from "@/types";
import { apiFetch, handleResponse } from "@/services/http";


export async function getInsights(forceRefresh = false): Promise<AIInsight[]> {
  try {
    const res = await apiFetch("/ai-insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ force_refresh: forceRefresh }),
    });

    const data = await handleResponse<{ data: AIInsight[] }>(res);
    return data.data;
  } catch (err) {
    console.error("Insights fetch failed:", err);
    return [];
  }
}

export async function getInsightsHistory(): Promise<AIInsight[]> {
  try {
    const res = await apiFetch("/ai-insights/history", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await handleResponse<{ data: AIInsight[] }>(res);
    return data.data;
  } catch (err) {
    console.error("Insights history fetch failed:", err);
    return [];
  }
}