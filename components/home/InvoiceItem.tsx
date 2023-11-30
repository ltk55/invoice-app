import Image from "next/image";
import Link from "next/link";

import { formatCurrency, formatDate } from "@/lib/utils";
import iconArrowRight from "@/public/assets/icon-arrow-right.svg";
import { type Invoice } from "@/types";

import StatusBadge from "../shared/StatusBadge";

export default function InvoiceItem({
  invoice,
}: {
  invoice: Invoice;
}): React.JSX.Element {
  const { id, paymentDue, total, clientName, status } = invoice;

  return (
    <Link
      href={`./invoice/${id}`}
      className="flex h-[134px] w-[327px] cursor-pointer items-center justify-between rounded-lg bg-white px-6 pb-[22px] pt-6 shadow hover:outline hover:outline-colour-100 dark:bg-colour-300 md:flex md:h-[72px] md:w-[672px] md:justify-start md:px-8 md:py-0 xl:w-[730px]"
    >
      <div className="flex h-full flex-col items-start justify-between md:flex md:flex-row md:items-center">
        <div className="font-bold leading-none md:mr-2 md:w-20 xl:w-24">
          <span className="text-colour-700">#</span>
          <span className="text-colour-800 dark:text-white">{id}</span>
        </div>

        <div className="md:mr-3 md:w-32 xl:w-36">
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

        <div className="hidden text-xs font-medium leading-none text-slate-400 dark:text-white md:mr-[10px] md:block md:w-28 xl:w-32">
          {clientName}
        </div>
      </div>

      <div className="flex h-full flex-col items-center justify-between md:mr-5 md:flex md:flex-row">
        <div className="text-right text-xs font-medium leading-none text-slate-400 dark:text-white md:hidden">
          {clientName}
        </div>

        <div className="hidden font-bold dark:text-white md:mr-10 md:block md:w-[90px] md:text-right xl:w-24">
          {formatCurrency(total)}
        </div>

        <StatusBadge status={status} className="mb-[5px] md:mb-0" />
      </div>

      <Image
        src={iconArrowRight}
        alt={`go to invoice ${id}`}
        className="hidden md:block"
      />
    </Link>
  );
}
