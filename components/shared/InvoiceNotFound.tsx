import Image from "next/image";

import illustrationEmpty from "@/public/assets/illustration-empty.svg";

export default function InvoiceNotFound(): React.JSX.Element {
  return (
    <div className="flex h-full w-56 flex-col items-center text-center text-colour-800">
      <Image src={illustrationEmpty} alt="empty" />
      <h1 className="mt-11 text-2xl font-bold">There is nothing here</h1>
      <small className="mt-6 text-xs font-medium">
        Create an invoice by clicking the New button and get started
      </small>
    </div>
  );
}
