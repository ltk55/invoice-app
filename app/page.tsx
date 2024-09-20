"use client";

import { useEffect } from "react";

import InvoiceList from "@/components/home/InvoiceList";
import ActionBar from "@/components/shared/ActionBar/ActionBar";
import useInvoiceStore from "@/lib/invoiceStore";

export default function Home(): React.JSX.Element {
  const invoices = useInvoiceStore((state) => state.invoices);

  useEffect(() => {
    const invoiceCount = invoices.length;
    document.title = `Home | ${invoiceCount} ${invoiceCount === 1 ? "invoice" : "invoices"}`;
  }, [invoices]);

  return (
    <main className="mx-6 flex flex-col items-center justify-center md:mx-12">
      <ActionBar />
      <InvoiceList />
    </main>
  );
}
