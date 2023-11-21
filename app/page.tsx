import InvoiceList from "@/components/home/InvoiceList";
import ActionBar from "@/components/shared/ActionBar";

export default function Home(): React.JSX.Element {
  return (
    <main className="mx-6 flex flex-col justify-center md:mx-12 xl:items-center">
      <ActionBar />
      <InvoiceList />
    </main>
  );
}
