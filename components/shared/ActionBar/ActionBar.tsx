"use client";

import { useState } from "react";

import InvoiceForm from "@/components/invoice/InvoiceForm";
import useInvoiceStore from "@/lib/invoiceStore";
import { filterInvoices } from "@/lib/utils";

import Button from "../Button";
import StatusFilterMenu from "./StatusFilterMenu";

export default function ActionBar(): React.JSX.Element {
  const [invoices, filterStatus] = useInvoiceStore((state) => [
    state.invoices,
    state.filterStatus,
  ]);

  const [isInvoiceFormOpen, setInvoiceFormOpen] = useState(false);

  const filteredInvoices = invoices.filter((invoice) =>
    filterInvoices(invoice, filterStatus),
  );

  const invoiceCountMessage =
    filteredInvoices.length === 0
      ? "No invoices"
      : `There are ${invoices.length} total invoices`;

  const handleNewInvoiceClick = (): void => {
    setInvoiceFormOpen(true);
  };

  const handleCloseInvoiceForm = (): void => {
    setInvoiceFormOpen(false);
  };

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

      <div className="flex items-center gap-4">
        <StatusFilterMenu />

        <Button
          variant={1}
          className="pl-1 pr-4 text-sm"
          onClick={handleNewInvoiceClick}
        >
          New Invoice
        </Button>
      </div>

      {isInvoiceFormOpen && (
        <InvoiceForm
          mode="create"
          open={isInvoiceFormOpen}
          onClose={handleCloseInvoiceForm}
        />
      )}
    </div>
  );
}
