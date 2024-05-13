"use client";

import { notFound } from "next/navigation";
import { useState } from "react";

import InvoiceDetails from "@/components/invoice/InvoiceDetails";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import StatusBar from "@/components/invoice/StatusBar";
import GoBackBtn from "@/components/shared/GoBackBtn";
import useInvoiceStore from "@/lib/invoiceStore";

interface InvoicePageProps {
  params: { id: string };
}

export default function InvoicePage({
  params: { id },
}: InvoicePageProps): React.JSX.Element {
  const invoices = useInvoiceStore((state) => state.invoices);

  const invoice = invoices.find((invoice) => invoice.id === id);

  if (invoice == null) {
    notFound();
  }

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="mx-6 flex md:mx-10">
      <div className="mt-[105px] flex h-10 w-full flex-col md:mt-[129px] md:items-center xl:mt-16">
        <div className="md:w-[672px] xl:w-[730px]">
          <GoBackBtn />
          <StatusBar
            invoiceStatus={invoice.status}
            onEdit={() => {
              setDrawerOpen(true);
            }}
          />
          <InvoiceDetails invoice={invoice} />
          <InvoiceForm
            invoice={invoice}
            open={drawerOpen}
            onClose={() => {
              setDrawerOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
