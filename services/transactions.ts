// TODO Week 3: replace with fetch() call to FastAPI

import { transactions } from './mockdata'
import { Transaction } from "../types"

export function getTransactions(): Transaction[] {
    return transactions;
} 