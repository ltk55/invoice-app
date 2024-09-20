"use client";

import { useEffect } from "react";

import InvoiceList from "@/components/home/InvoiceList";
import ActionBar from "@/components/shared/ActionBar/ActionBar";
import useInvoiceStore from "@/lib/invoiceStore";
import { filterInvoices } from "@/lib/utils";

export default function Home(): React.JSX.Element {
  const [invoices, filterStatus] = useInvoiceStore((state) => [
    state.invoices,
    state.filterStatus,
  ]);

  const filteredInvoices = invoices.filter((invoice) =>
    filterInvoices(invoice, filterStatus),
  );

  const invoiceCount = filteredInvoices.length;

  useEffect(() => {
    document.title = `Home | ${invoiceCount} invoice${invoiceCount !== 1 ? "s" : ""}`;
  }, [invoiceCount]);

  return (
    <main className="mx-6 flex flex-col items-center justify-center md:mx-12 ">
      <ActionBar invoiceCount={invoiceCount} />
      <InvoiceList invoices={filteredInvoices} />
    </main>
  );
}
