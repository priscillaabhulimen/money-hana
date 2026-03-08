'use client';

import { useState } from "react";
import { Goal, ExpenseCategory } from "@/types";
import { Plus } from "lucide-react";
import { buttonStyle } from "@/lib/constants";
import GoalCard from "./components/GoalCard";
import GoalModal from "./components/GoalModal";
import GoalCardSkeleton from "@/components/skeletons/goal-card";
import { useGoals, useDeleteGoal } from "@/hooks/useGoals";

export default function GoalsPage() {
  const { data, isLoading, isError } = useGoals();
  const deleteGoal = useDeleteGoal();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>(undefined);

  const goals = data?.data ?? [];
  const existingCategories = goals.map((g) => g.category as ExpenseCategory);

  function handleEdit(goal: Goal) {
    setEditingGoal(goal);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    deleteGoal.mutate(id);
  }

  function handleModalClose() {
    setModalOpen(false);
    setEditingGoal(undefined);
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Goals</h1>
        <button
          onClick={() => setModalOpen(true)}
          className={`${buttonStyle} flex items-center gap-2 px-3`}
        >
          <Plus size={16} />
          <span className="hidden lg:block">Add Goal</span>
        </button>
      </div>

      {isError && (
        <p className="text-sm text-red-500">Failed to load goals. Please try again.</p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <GoalCardSkeleton key={i} />)}
        </div>
      ) : goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-2">
          <p className="text-sm font-medium">No goals yet</p>
          <p className="text-xs text-muted-foreground">
            Add a spending goal to start tracking your budget.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <GoalModal
          onClose={handleModalClose}
          initialData={editingGoal}
          existingCategories={existingCategories}
        />
      )}

    </div>
  );
}
