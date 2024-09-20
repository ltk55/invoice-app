"use client";

import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import DeleteConfirmationModal from "@/components/invoice/DeleteConfirmationModal";
import InvoiceDetails from "@/components/invoice/InvoiceDetails";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import StatusBar from "@/components/invoice/StatusBar";
import GoBackBtn from "@/components/shared/GoBackBtn";
import useInvoiceStore from "@/lib/invoiceStore";
import { capitalizeFirstCharacter } from "@/lib/utils";

interface InvoicePageProps {
  params: { id: string };
}

export default function InvoicePage({
  params: { id },
}: InvoicePageProps): React.JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { invoices, deleteInvoice } = useInvoiceStore((state) => ({
    invoices: state.invoices,
    deleteInvoice: state.deleteInvoice,
  }));

  const router = useRouter();

  const invoice = invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    if (invoice != null) {
      document.title = `Invoice #${invoice.id} | ${capitalizeFirstCharacter(invoice.status)}`;
      const metaDescription = document.querySelector(
        "meta[name='description']",
      );
      if (metaDescription != null) {
        metaDescription.setAttribute(
          "content",
          `Details for invoice #${invoice.id} including status, items, and client information.`,
        );
      }
    }
  }, [invoice]);

  if (invoice == null) {
    notFound();
  }

  const handleDelete = (): void => {
    router.push("/");
    setTimeout(() => {
      deleteInvoice(id);
    }, 1);
  };

  return (
    <div className="mx-6 flex md:mx-10">
      <div className="mt-[105px] flex h-10 w-full flex-col md:mt-[129px] md:items-center xl:mt-16">
        <div className="md:w-[672px] xl:w-[730px]">
          <GoBackBtn />
          <StatusBar
            invoiceStatus={invoice.status}
            invoiceId={invoice.id}
            onEdit={() => {
              setDrawerOpen(true);
            }}
            onDelete={() => {
              setIsModalOpen(true);
            }}
          />
          <InvoiceDetails invoice={invoice} />
          <InvoiceForm
            mode="edit"
            invoice={invoice}
            open={drawerOpen}
            onClose={() => {
              setDrawerOpen(false);
            }}
          />
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onDelete={handleDelete}
        invoiceId={invoice.id}
      />
    </div>
  );
}
