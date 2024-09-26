import { motion } from "framer-motion";

import type { Invoice } from "@/types";

import InvoiceItem from "./InvoiceItem";

interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList({
  invoices,
}: InvoiceListProps): React.JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      {invoices.map((invoice) => (
        <motion.div key={invoice.id} variants={itemVariants}>
          <InvoiceItem invoice={invoice} />
        </motion.div>
      ))}
    </motion.div>
  );
}
