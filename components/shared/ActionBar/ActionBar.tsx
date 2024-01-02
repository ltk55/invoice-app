"use client";

import useInvoiceStore from "@/lib/invoiceStore";
import { filterInvoices } from "@/lib/utils";

import StatusFilterMenu from "./StatusFilterMenu";

export default function ActionBar(): React.JSX.Element {
  const [invoices, filterStatus] = useInvoiceStore((state) => [
    state.invoices,
    state.filterStatus,
  ]);

  const filteredInvoices = invoices.filter((invoice) =>
    filterInvoices(invoice, filterStatus),
  );

  const invoiceCountMessage =
    filteredInvoices.length === 0
      ? "No invoices"
      : `There are ${invoices.length} total invoices`;

  return (
    <div className="mb-8 mt-[108px] flex w-[327px] justify-between md:mb-16 md:w-[672px] xl:mt-[78px]">
      <section>
        <h1 className="text-2xl font-bold text-colour-800 dark:text-white">
          Invoices
        </h1>
        <div className="text-xs font-medium leading-none text-colour-600 dark:text-colour-500">
          {invoiceCountMessage}
        </div>
      </section>

      <StatusFilterMenu />
    </div>
  );
}
