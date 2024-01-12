import { formatDate } from "@/lib/utils";
import type { Address, Invoice } from "@/types";

import InvoicePriceTable from "./InvoicePriceTable";

interface AddressBlockProps {
  address: Address;
}

const AddressBlock: React.FC<AddressBlockProps> = ({ address }) => (
  <>
    {Object.values(address).map((line, index) => (
      <p key={index} className="mb-1">
        {line}
      </p>
    ))}
  </>
);

export default function InvoiceDetail({
  invoice,
}: {
  invoice: Invoice;
}): JSX.Element {
  const {
    id,
    description,
    senderAddress,
    createdAt,
    paymentDue,
    clientName,
    clientAddress,
    clientEmail,
    items,
    total,
  } = invoice;

  return (
    <div className="mb-14 rounded-lg bg-white p-6 shadow dark:bg-colour-300 md:mb-11 md:w-[672px] md:p-8 xl:w-[730px] xl:p-12">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="mb-8">
          <div className="mb-1 font-bold">
            <span className="font-bold text-colour-700 dark:text-colour-600">
              #
            </span>
            <span className="font-bold text-colour-800 dark:text-white">
              {id}
            </span>
          </div>

          <div className="text-xs font-medium text-colour-700 dark:text-colour-500">
            {description}
          </div>
        </div>

        <div className="mb-8 text-xs font-medium text-colour-700 dark:text-colour-500">
          <AddressBlock address={senderAddress} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-[120px]">
        <div className="flex gap-[60px] md:gap-[120px]">
          <div className="md:flex md:flex-col">
            {[
              { label: "Invoice Date", value: formatDate(createdAt) },
              { label: "Payment Due", value: formatDate(paymentDue) },
            ].map(({ label, value }, index) => (
              <div key={index} className="mb-8">
                <div className="mb-3 text-xs font-medium leading-none text-colour-700 dark:text-colour-500">
                  {label}
                </div>
                <div className="text-base font-bold leading-tight text-colour-800 dark:text-white">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-3 text-xs font-medium leading-none text-colour-700 dark:text-colour-500">
              Bill To
            </div>
            <div className="mb-2 text-base font-bold leading-tight text-colour-800 dark:text-white">
              {clientName}
            </div>
            <div className="text-xs font-medium text-colour-700 dark:text-colour-500">
              <AddressBlock address={clientAddress} />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 text-xs font-medium leading-none text-colour-700 dark:text-colour-500">
            Sent to
          </div>
          <div className="text-base font-bold leading-tight text-colour-800 dark:text-white">
            {clientEmail}
          </div>
        </div>
      </div>

      <InvoicePriceTable invoiceItems={items} totalInvoiceAmount={total} />
    </div>
  );
}
