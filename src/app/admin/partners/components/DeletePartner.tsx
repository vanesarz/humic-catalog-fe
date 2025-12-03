// src/app/partners/components/DeletePartner.tsx
import { Partner } from "../types";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";

interface DeletePartnerProps {
  open: boolean;
  onClose: () => void;
  data: Partner | null;
  onConfirm: (slug: string) => Promise<void> | void;
}

export default function DeletePartner({ open, onClose, data, onConfirm }: DeletePartnerProps) {
  if (!data) return null;

  const handleDelete = async () => {
    await onConfirm(data.slug);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="max-w-lg">
        <h2 className="text-xl font-semibold mb-3">Are you sure?</h2>

        <p className="text-sm text-gray-500 mt-3">This action cannot be undone. This will permanently delete the partner organization.</p>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </Dialog>
  );
}