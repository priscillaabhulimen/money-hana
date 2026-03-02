'use client';

import { useState, useMemo } from "react";
import { getTransactions, deleteTransaction } from "@/services/transactions";
import { Transaction, Category } from "@/types";
import { isWithinInterval, parseISO } from "date-fns";
import { Plus } from "lucide-react";
import TransactionFilters from "./components/TransactionFilters";
import TransactionTable from "./components/TransactionTable";
import TransactionPagination from "./components/TransactionPagination";
import TransactionModal from "./components/TransactionModal";
import { buttonStyle } from "@/lib/constants";

const ROWS_PER_PAGE = 30;

function computeRunningBalances(transactions: Transaction[]): Map<string, number> {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const map = new Map<string, number>();
  let running = 0;
  sorted.forEach((t) => {
    running += t.type === "income" ? t.amount : -t.amount;
    map.set(t.id, running);
  });
  return map;
}

export default function TransactionsPage() {
  const transactions: Transaction[] = getTransactions();
  const runningBalances = useMemo(() => computeRunningBalances(transactions), [transactions]);

  const [category, setCategory] = useState<Category | "All">("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);

  const filtered = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((t) => {
        if (category !== "All" && t.category !== category) return false;
        if (fromDate && toDate) {
          return isWithinInterval(parseISO(t.date), {
            start: parseISO(fromDate),
            end: parseISO(toDate),
          });
        }
        if (fromDate && parseISO(t.date) < parseISO(fromDate)) return false;
        if (toDate && parseISO(t.date) > parseISO(toDate)) return false;
        return true;
      });
  }, [transactions, category, fromDate, toDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  function handleClear() {
    setCategory("All");
    setFromDate("");
    setToDate("");
    setPage(1);
  }

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    deleteTransaction(id);
  }

  function handleModalClose() {
    setModalOpen(false);
    setEditingTransaction(undefined);
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-10">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <button
          onClick={() => setModalOpen(true)}
          className={`${buttonStyle} flex items-center gap-2 px-3`}
        >
          <Plus size={16} />
          <span className="hidden lg:block">Add Transaction</span>
        </button>
      </div>

      <TransactionFilters
        category={category}
        fromDate={fromDate}
        toDate={toDate}
        onCategoryChange={(v) => { setCategory(v); setPage(1); }}
        onFromDateChange={(v) => { setFromDate(v); setPage(1); }}
        onToDateChange={(v) => { setToDate(v); setPage(1); }}
        onClear={handleClear}
      />

      <TransactionTable
        transactions={paginated}
        runningBalances={runningBalances}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TransactionPagination
        page={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={setPage}
      />

      {modalOpen && (
        <TransactionModal
          onClose={handleModalClose}
          initialData={editingTransaction}
        />
      )}

    </div>
  );
}