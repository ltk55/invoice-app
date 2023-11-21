"use client";

import useInvoiceStore from "@/lib/invoiceStore";

import InvoiceItem from "./InvoiceItem";

export default function InvoiceList(): React.JSX.Element {
  const [invoices] = useInvoiceStore((state) => [state.invoices]);

  return (
    <ul className="mb-28 flex list-none flex-col gap-4 md:w-[672px]">
      {invoices.map((invoice) => (
        <InvoiceItem key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}
