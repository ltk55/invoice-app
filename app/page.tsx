import InvoiceList from "@/components/home/InvoiceList";

export default function Home(): React.JSX.Element {
  return (
    <main className="mx-6 flex justify-center md:mx-12">
      <InvoiceList />
    </main>
  );
}
