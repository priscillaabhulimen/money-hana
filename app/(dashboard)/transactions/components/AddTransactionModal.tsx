import { Button } from "@/components/ui/button";

interface AddTransactionModalProps {
  onClose: () => void;
}

export default function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-sm shadow-lg p-8 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Modal coming in Issue 9.
        </p>
        <Button onClick={onClose} className="w-full">Close</Button>
      </div>
    </div>
  );
}
