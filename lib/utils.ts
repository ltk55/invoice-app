import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { FilterStatus, Invoice } from "@/types";

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

export {
  capitalizeFirstCharacter,
  cn,
  filterInvoices,
  formatCurrency,
  formatDate,
  generateInvoiceID,
};
