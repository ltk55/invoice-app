import Button from "../shared/Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  invoiceId: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onDelete,
  invoiceId,
}: DeleteConfirmationModalProps): React.JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-6 rounded-lg bg-white p-6 shadow-lg dark:bg-colour-300 md:p-10">
        <h2 className="mb-4 text-lg font-semibold text-colour-800 dark:text-white">
          Confirm Deletion
        </h2>
        <p className="mb-8 text-colour-600">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button variant={3} onClick={onClose} className="px-6 py-4">
            Cancel
          </Button>
          <Button variant={5} onClick={onDelete} className="px-6 py-4">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
