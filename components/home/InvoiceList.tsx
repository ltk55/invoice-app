import data from "@/data/data.json";

import InvoiceItem from "./InvoiceItem";

export default function InvoiceList(): React.JSX.Element {
  return (
    <ul className="mb-28 mt-8 flex w-[672px] list-none flex-col gap-4 md:mt-16">
      {data.map((invoice) => (
        <InvoiceItem key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}
