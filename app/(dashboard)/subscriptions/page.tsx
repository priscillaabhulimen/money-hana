'use client';

import { useState } from "react";
import { Subscription } from "@/types";
import { Plus } from "lucide-react";
import { buttonStyle } from "@/lib/constants";
import SubscriptionCard from "./components/SubscriptionCard";
import SubscriptionModal from "./components/SubscriptionModal";
import SubscriptionCardSkeleton from "@/components/skeletons/subscription-card";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useSubscriptions, useDeleteSubscription } from "@/hooks/useSubscriptions";

export default function SubscriptionsPage() {
  const { data, isLoading, isError } = useSubscriptions();
  const deleteSubscription = useDeleteSubscription();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const subscriptions = data?.data ?? [];

  function handleEdit(subscription: Subscription) {
    setEditingSubscription(subscription);
    setModalOpen(true);
  }

  function handleDeleteRequest(id: string) {
    setDeletingId(id);
  }

  function handleDeleteConfirm() {
    if (deletingId) {
      deleteSubscription.mutate(deletingId);
      setDeletingId(null);
    }
  }

  function handleModalClose() {
    setModalOpen(false);
    setEditingSubscription(undefined);
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Subscriptions</h1>
        <button
          onClick={() => setModalOpen(true)}
          className={`${buttonStyle} flex items-center gap-2 px-3`}
        >
          <Plus size={16} />
          <span className="hidden lg:block">Add Subscription</span>
        </button>
      </div>

      {isError && (
        <p className="text-sm text-red-500">Failed to load subscriptions. Please try again.</p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <SubscriptionCardSkeleton key={i} />)}
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-2">
          <p className="text-sm font-medium">No subscriptions yet</p>
          <p className="text-xs text-muted-foreground">
            Add a subscription to start tracking your recurring payments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <SubscriptionModal
          onClose={handleModalClose}
          initialData={editingSubscription}
        />
      )}

      <ConfirmDialog
        open={!!deletingId}
        title="Delete subscription"
        description="Are you sure you want to delete this subscription? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
        destructive
      />

    </div>
  );
}
