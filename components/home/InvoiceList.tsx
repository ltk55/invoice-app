"use client";

import useInvoiceStore from "@/lib/invoiceStore";

import InvoiceNotFound from "../shared/InvoiceNotFound";
import InvoiceItem from "./InvoiceItem";

export default function InvoiceList(): React.JSX.Element {
  const [invoices, filterStatus] = useInvoiceStore((state) => [
    state.invoices,
    state.filterStatus,
  ]);

  const filteredInvoices = invoices.filter((invoice) => {
    if (
      (filterStatus.draft && invoice.status === "draft") ||
      (filterStatus.pending && invoice.status === "pending") ||
      (filterStatus.paid && invoice.status === "paid")
    ) {
      return true;
    }
    // If no checkbox is checked, display all invoices
    if (!filterStatus.draft && !filterStatus.pending && !filterStatus.paid) {
      return true;
    }
    return false;
  });

  return filteredInvoices.length === 0 ? (
    <InvoiceNotFound />
  ) : (
    <ul className="mb-28 flex list-none flex-col gap-4 md:w-[672px] xl:w-[730px]">
      {filteredInvoices.map((invoice) => (
        <InvoiceItem key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}
