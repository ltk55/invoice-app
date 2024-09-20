"use client";

import type { Invoice } from "@/types";

import InvoiceNotFound from "../shared/InvoiceNotFound";
import InvoiceItem from "./InvoiceItem";

export default function InvoiceList({
  invoices,
}: {
  invoices: Invoice[];
}): React.JSX.Element {
  return invoices.length === 0 ? (
    <InvoiceNotFound />
  ) : (
    <ul className="mb-28 flex list-none flex-col gap-4 md:w-[672px] xl:w-[730px]">
      {invoices.map((invoice) => (
        <InvoiceItem key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}
