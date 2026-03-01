'use client';
import { getTransactions } from "@/services/transactions";
import BalanceCard from "./components/BalanceCard";
import { Transaction } from "@/types";
import IncomeExpenseChart from "./components/IncomeExpenseChart";

export default function DashboardPage() {
    const transactions: Transaction[]  = getTransactions();

    let balance = 0, income = 0, expenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            income += transaction.amount;
            balance += transaction.amount;
        } else if (transaction.type === 'expense') {
            expenses += transaction.amount;
            balance -= transaction.amount;
        }
    });

    return (
        <div className="flex flex-col gap-4 px-8 py-10">
            <BalanceCard balance={balance} income={income} expenses={expenses} /> 
            <IncomeExpenseChart transactions={transactions} />
        </div>
    );
}