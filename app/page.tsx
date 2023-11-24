import InvoiceList from "@/components/home/InvoiceList";
import ActionBar from "@/components/shared/ActionBar/ActionBar";

export default function Home(): React.JSX.Element {
  return (
    <main className="mx-6 flex flex-col items-center justify-center md:mx-12 ">
      <ActionBar />
      <InvoiceList />
    </main>
  );
}
