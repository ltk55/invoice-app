import type { Status } from "@/types";

import Button from "../shared/Button";
import StatusBadge from "../shared/StatusBadge";

export default function StatusBar({
  invoiceStatus,
  onEdit,
}: {
  invoiceStatus: Status;
  onEdit: () => void;
}): JSX.Element {
  return (
    <div className="mb-4 mt-[31px] flex min-h-[91px] w-full max-w-[730px] items-center justify-between rounded-lg bg-white px-6 shadow dark:bg-colour-300">
      <div className="flex w-full items-center justify-between gap-5 md:justify-normal">
        <span className="text-xs font-medium text-slate-400 dark:text-colour-500">
          Status
        </span>

        <StatusBadge status={invoiceStatus} />
      </div>

      <div className="fixed bottom-0 left-0 flex h-24 w-full items-center justify-center gap-2 bg-white dark:bg-colour-300 md:relative">
        <Button variant={3} className="px-6" onClick={onEdit}>
          Edit
        </Button>

        <Button variant={5} className="px-6">
          Delete
        </Button>

        <Button variant={2} className="w-36 px-6">
          Mark as Paid
        </Button>
      </div>
    </div>
  );
}
