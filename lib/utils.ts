import clsx, { type ClassValue } from "clsx";
import { addDays } from "date-fns";
import { twMerge } from "tailwind-merge";

import type { FilterStatus, Invoice, InvoiceFormData } from "@/types";

function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}

function capitalizeFirstCharacter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatCurrency(amount: number): string {
  const numericAmount =
    typeof amount === "number" ? amount : parseFloat(amount);

  if (isNaN(numericAmount)) {
    return "£ 0.00";
  }

  return `£ ${numericAmount.toFixed(2)}`;
}

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

  return formattedDate;
}

function filterInvoices(invoice: Invoice, filterStatus: FilterStatus): boolean {
  if (
    (filterStatus.draft && invoice.status === "draft") ||
    (filterStatus.pending && invoice.status === "pending") ||
    (filterStatus.paid && invoice.status === "paid")
  ) {
    return true;
  }
  // If all invoice status is false, return true
  if (!filterStatus.draft && !filterStatus.pending && !filterStatus.paid) {
    return true;
  }
  return false;
}

function generateInvoiceID(existingIDs: string[]): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newID;

  do {
    const randomLetters = Array(2)
      .fill("")
      .map(() => letters[Math.floor(Math.random() * letters.length)])
      .join("");

    const randomDigits = String(Math.floor(1000 + Math.random() * 9000));

    newID = `${randomLetters}${randomDigits}`;
  } while (existingIDs.includes(newID));

  return newID;
}

function createInvoiceObject(
  data: InvoiceFormData,
  existingIDs: string[],
  saveType: "draft" | "send",
): Invoice {
  const newInvoiceID = generateInvoiceID(existingIDs);

  return {
    id: newInvoiceID,
    senderAddress: {
      street: data.senderStreetAddress,
      city: data.senderCity,
      postCode: data.senderPostCode,
      country: data.senderCountry,
    },
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    clientAddress: {
      street: data.clientStreetAddress,
      city: data.clientCity,
      postCode: data.clientPostCode,
      country: data.clientCountry,
    },
    createdAt: data.invoiceDate.toISOString(),
    paymentDue: addDays(
      new Date(data.invoiceDate),
      data.paymentTerms,
    ).toISOString(),
    paymentTerms: data.paymentTerms,
    description: data.projectDescription,
    status: saveType === "draft" ? "draft" : "pending",
    items: data.items.map((item) => ({
      ...item,
      total: item.quantity * item.price,
    })),
    total: data.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    ),
  };
}

export {
  capitalizeFirstCharacter,
  cn,
  createInvoiceObject,
  filterInvoices,
  formatCurrency,
  formatDate,
  generateInvoiceID,
};
