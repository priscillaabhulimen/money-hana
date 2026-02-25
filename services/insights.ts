// TODO Week 3: replace with fetch() call to FastAPI

import { aiInsights } from './mockdata'
import { AIInsight } from "../types"

export function getInsights(): AIInsight[] {
    return aiInsights;
} 