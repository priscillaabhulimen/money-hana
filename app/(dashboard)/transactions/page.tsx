'use client';

import { useState, useMemo } from "react";
import { Transaction, Category } from "@/types";
import { Plus } from "lucide-react";
import TransactionFilters from "./components/TransactionFilters";
import TransactionTable from "./components/TransactionTable";
import TransactionPagination from "./components/TransactionPagination";
import TransactionModal from "./components/TransactionModal";
import TransactionTableSkeleton from "@/components/skeletons/transaction-table";
import { buttonStyle } from "@/lib/constants";
import { useTransactions, useDeleteTransaction } from "@/hooks/useTransactions";
import { ROWS_PER_PAGE } from "@/services/transactions";

export default function TransactionsPage() {
  const [category, setCategory] = useState<Category | "All">("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);

  const { data, isLoading, isError } = useTransactions(
    page,
    fromDate || undefined,
    toDate || undefined,
  );

  const deleteTransaction = useDeleteTransaction();

  // Client-side category filter (category filter is UI-only, not sent to API)
  const transactions = useMemo(() => data?.data ?? [], [data]);
  const filtered = useMemo(() => {
    if (category === "All") return transactions;
    return transactions.filter((t) => t.category === category);
  }, [transactions, category]);

  const total = category === "All" ? (data?.total ?? 0) : filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / ROWS_PER_PAGE));

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
    deleteTransaction.mutate(id);
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

      {isError && (
        <p className="text-sm text-red-500">Failed to load transactions. Please try again.</p>
      )}

      {isLoading ? (
        <TransactionTableSkeleton />
      ) : (
        <TransactionTable
          transactions={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <TransactionPagination
        page={page}
        totalPages={totalPages}
        totalItems={total}
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
