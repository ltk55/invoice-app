import { formatCurrency } from "@/lib/utils";
import type { Item } from "@/types";

export default function InvoicePriceCard({
  invoiceItems,
  totalInvoiceAmount,
}: {
  invoiceItems: Item[];
  totalInvoiceAmount: number;
}): JSX.Element {
  return (
    <div className="mt-9 rounded-t-lg bg-slate-50 dark:bg-colour-400">
      {/* mobile view */}
      <div className="md:hidden">
        {invoiceItems.map((item, index) => {
          return (
            <div
              key={index}
              className="flex w-full items-center justify-between p-4 font-bold"
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
      {/* <table className="hidden p-8 md:block">
        <thead className="pb-8">
          <tr className="text-right first:text-left">
            <td>Item Name</td>
            <td>QTY.</td>
            <td>Price</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => (
            <tr key={index} className="">
              <td className="text-left">{item.name}</td>
              <td className="text-right">{item.quantity}</td>
              <td className="text-right">{item.price}</td>
              <td className="text-right">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="flex items-center justify-between rounded-b-lg bg-gray-700 px-6 py-5 text-white dark:bg-colour-800">
        <div className="text-xs font-medium">Amount Due</div>
        <div className="text-right text-2xl font-bold leading-loose">
          {formatCurrency(totalInvoiceAmount)}
        </div>
      </div>
    </div>
  );
}
