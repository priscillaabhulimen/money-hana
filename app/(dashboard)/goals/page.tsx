'use client';

import { useState } from "react";
import { getGoals, deleteGoal } from "@/services/goals";
import { Goal, Category } from "@/types";
import { Plus } from "lucide-react";
import { buttonStyle } from "@/lib/constants";
import GoalCard from "./components/GoalCard";
import GoalModal from "./components/GoalModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterPeriod } from "../dashboard/page";

export default function GoalsPage() {
  const goals: Goal[] = getGoals();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>(undefined);
  const [period, setPeriod] = useState<FilterPeriod>("month");

  const existingCategories = goals.map((g) => g.category as Category);

  function handleEdit(goal: Goal) {
    setEditingGoal(goal);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    deleteGoal(id);
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

      {/* Period dropdown */}
      <Select value={period} onValueChange={(v) => setPeriod(v as FilterPeriod)}>
        <SelectTrigger className="w-36 text-xs bg-muted border-0 shadow-none focus:ring-0 cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>

      {/* Goals grid */}
      {goals.length === 0 ? (
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

      {/* Modal */}
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