// TODO Week 3: replace with fetch() call to FastAPI

import { goals } from './mockdata'
import { Goal } from "../types"

export function getGoals(): Goal[] {
    return goals;
} 