import { formatCurrency, formatDate } from "@/lib/utils";
import { type Invoice } from "@/types";

import StatusBadge from "../shared/StatusBadge";

export default function InvoiceItem({
  invoice,
}: {
  invoice: Invoice;
}): React.JSX.Element {
  const { id, paymentDue, total, clientName, status } = invoice;

  return (
    <li className="flex h-[134px] w-[327px] items-center justify-between rounded-lg bg-white px-6 pb-[22px] pt-6 shadow dark:bg-colour-300 md:flex md:h-[72px] md:w-[672px] md:justify-between md:px-8 md:py-0">
      <div className="flex h-full flex-col items-start justify-between md:flex md:flex-row md:items-center">
        <div className="font-bold leading-none md:mr-7">
          <span className="text-colour-700">#</span>
          <span className="text-colour-800 dark:text-white">{id}</span>
        </div>

        <div className="md:mr-[53px]">
          <span className="text-xs font-medium leading-none text-colour-600 dark:text-colour-500">
            Due{" "}
          </span>
          <span className="text-xs font-medium leading-none text-colour-700 dark:text-colour-500">
            {formatDate(paymentDue)}
          </span>
        </div>

        <div className="font-bold text-colour-800 dark:text-white md:hidden">
          {formatCurrency(total)}
        </div>

        <div className="hidden text-xs font-medium leading-none text-slate-400 dark:text-white md:mr-[75px] md:block">
          {clientName}
        </div>
      </div>

      <div className="flex h-full flex-col items-center justify-between md:flex md:flex-row">
        <div className="text-right text-xs font-medium leading-none text-slate-400 dark:text-white md:hidden">
          {clientName}
        </div>

        <div className="hidden font-bold dark:text-white md:mr-10 md:block">
          {formatCurrency(total)}
        </div>

        <StatusBadge status={status} className="mb-[5px] md:mb-0" />
      </div>
    </li>
  );
}
