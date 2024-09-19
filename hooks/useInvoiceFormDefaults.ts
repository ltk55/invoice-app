import { useMemo } from "react";

import type { Invoice, InvoiceFormData } from "@/types";

interface UseInvoiceFormDefaultsProps {
  invoice?: Invoice;
  mode: "edit" | "create";
}

export function useInvoiceFormDefaults({
  invoice,
  mode,
}: UseInvoiceFormDefaultsProps): InvoiceFormData {
  return useMemo(() => {
    if (mode === "edit" && invoice != null) {
      return {
        senderStreetAddress: invoice.senderAddress.street,
        senderCity: invoice.senderAddress.city,
        senderPostCode: invoice.senderAddress.postCode,
        senderCountry: invoice.senderAddress.country,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        clientStreetAddress: invoice.clientAddress.street,
        clientCity: invoice.clientAddress.city,
        clientPostCode: invoice.clientAddress.postCode,
        clientCountry: invoice.clientAddress.country,
        invoiceDate: new Date(invoice.createdAt),
        paymentTerms: invoice.paymentTerms,
        projectDescription: invoice.description,
        items: invoice.items,
      };
    } else {
      return {
        senderStreetAddress: "",
        senderCity: "",
        senderPostCode: "",
        senderCountry: "",
        clientName: "",
        clientEmail: "",
        clientStreetAddress: "",
        clientCity: "",
        clientPostCode: "",
        clientCountry: "",
        invoiceDate: new Date(),
        paymentTerms: 30,
        projectDescription: "",
        items: [],
      };
    }
  }, [invoice, mode]);
}
