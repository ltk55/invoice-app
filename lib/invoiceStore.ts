import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Invoice } from "@/types";

import initialData from "../data/data.json";

interface InvoiceStore {
  invoices: Invoice[];
}

const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      invoices: initialData as Invoice[],
    }),
    {
      name: "invoice-app-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useInvoiceStore;
