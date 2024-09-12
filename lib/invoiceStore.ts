import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { FilterStatus, Invoice } from "@/types";

import initialData from "../data/data.json";

interface InvoiceStore {
  deleteInvoice: (id: string) => void;
  invoices: Invoice[];
  filterStatus: FilterStatus;
  setFilterStatus: (status: Partial<FilterStatus>) => void;
}

const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      invoices: initialData as Invoice[],
      filterStatus: {
        draft: false,
        pending: false,
        paid: false,
      },
      setFilterStatus: (status) => {
        set((state) => ({
          filterStatus: { ...state.filterStatus, ...status },
        }));
      },
      deleteInvoice: (id: string) => {
        set((state) => ({
          invoices: state.invoices.filter((invoice) => invoice.id !== id),
        }));
      },
    }),
    {
      name: "invoice-app-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useInvoiceStore;
