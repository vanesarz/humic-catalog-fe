// src/app/partners/components/DeletePartner.tsx
import { useState } from "react";
import { Internship } from "../types";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";

interface DeleteInternshipProps {
  open: boolean;
  onClose: () => void;
  data: Internship | null;
  onConfirm: (slug: string) => Promise<void>;
}

export default function DeleteInternship({
  open,
  onClose,
  data,
  onConfirm,
}: DeleteInternshipProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!data) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("deleting internship with slug:", data.slug);

      await onConfirm(data.slug);

      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to delete internship. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="max-w-lg">
        <h2 className="text-xl font-semibold mb-3">Are you sure?</h2>

        <p className="text-sm text-gray-500 mt-3">
          This action cannot be undone. This will permanently delete the internship project.
        </p>

        {error && (
          <p className="text-sm text-red-700 mt-3">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}