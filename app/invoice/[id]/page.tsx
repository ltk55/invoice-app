"use client";

import { notFound } from "next/navigation";

import Button from "@/components/shared/Button";
import GoBackBtn from "@/components/shared/GoBackBtn";
import StatusBadge from "@/components/shared/StatusBadge";
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

  return (
    <div className="mx-6 flex md:mx-10">
      <div className="mt-[105px] flex h-10 w-full flex-col md:mt-[129px] xl:mt-16 xl:items-center">
        <div className="md:w-[672px] xl:w-[730px]">
          <GoBackBtn />

          <div className="mt-[31px] flex min-h-[91px] w-full max-w-[730px] items-center justify-between rounded-lg bg-white px-6 shadow dark:bg-colour-300">
            <div className="flex w-full items-center justify-between gap-5 md:justify-normal">
              <span className="text-xs font-medium text-slate-400 dark:text-colour-500">
                Status
              </span>

              <StatusBadge status={invoice.status} />
            </div>

            <div className="hidden gap-2 md:flex">
              <Button variant={3} className="px-6">
                Edit
              </Button>

              <Button variant={5} className="px-6">
                Delete
              </Button>

              <Button variant={2} className="w-36 px-6">
                Mark as Paid
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
