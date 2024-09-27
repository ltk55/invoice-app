import { formatCurrency } from "@/lib/utils";
import type { Item } from "@/types";

export default function InvoicePriceTable({
  invoiceItems,
  totalInvoiceAmount,
}: {
  invoiceItems: Item[];
  totalInvoiceAmount: number;
}): JSX.Element {
  return (
    <div className="mt-9 rounded-t-lg bg-slate-50 dark:bg-colour-400">
      {/* mobile view */}
      <div className="px-4 pt-4 md:hidden ">
        {invoiceItems.map((item, index) => {
          return (
            <div
              key={index}
              className="flex w-full items-center justify-between pb-4 text-sm font-bold"
            >
              <div>
                <p className="text-colour-800 dark:text-white">{item.name}</p>
                <p className="text-colour-700 dark:text-colour-600">
                  {item.quantity} x {formatCurrency(item.price)}
                </p>
              </div>
              <div>
                <p className="text-colour-800 dark:text-white">
                  {formatCurrency(item.total)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* tablet & desktop view */}
      <table className="hidden w-full border-separate border-spacing-y-6 px-8 pb-2 pt-8 md:block">
        <thead>
          <tr className="text-xs font-medium leading-none text-colour-700 dark:text-colour-500">
            <td>Item Name</td>
            <td className="w-96 text-right">QTY.</td>
            <td className="w-60 text-right">Price</td>
            <td className="w-60 text-right">Total</td>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => (
            <tr key={index} className="font-bold leading-none text-white">
              <td className="w-96 text-left text-colour-800 dark:text-white">
                {item.name}
              </td>
              <td className="text-right text-colour-700 dark:text-colour-500">
                {item.quantity}
              </td>
              <td className="text-right text-colour-700 dark:text-colour-500">
                {formatCurrency(item.price)}
              </td>
              <td className="text-right text-colour-800 dark:text-white">
                {formatCurrency(item.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between rounded-b-lg bg-gray-700 px-6 py-5 text-white dark:bg-colour-800 md:px-8">
        <div className="text-xs font-medium md:text-base">Amount Due</div>
        <div className="text-right text-lg font-bold leading-loose md:text-2xl">
          {formatCurrency(totalInvoiceAmount)}
        </div>
      </div>
    </div>
  );
}
