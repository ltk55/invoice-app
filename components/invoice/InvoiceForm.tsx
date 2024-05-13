import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import type { Invoice } from "@/types";

import Button from "../shared/Button";
import Drawer from "../shared/Drawer";
import Input from "../shared/FormElements/Input";

interface InvoiceFormProps {
  invoice: Invoice;
  open: boolean;
  onClose: () => void;
}

interface FormInputs {
  paymentTerms: number;
}

export default function InvoiceForm({
  invoice,
  open,
  onClose,
}: InvoiceFormProps): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      paymentTerms: invoice?.paymentTerms,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // const invoiceId = invoices.findIndex((req) => req.id.toString() === id);
    // const updatedInvoice = {
    //   ...invoices[invoiceId],
    //   paymentTerms: data.paymentTerms,
    // };
    // const updatedInvoices = [...invoices];
    // updatedInvoices[invoiceId] = updatedInvoice;
    // setInvoices(updatedInvoices);
    // router.back();
  };

  //   const onDelete = (): void => {
  //     const productReqIndex = productRequests.findIndex(
  //       (req) => req.id.toString() === id,
  //     );

  //     if (productReqIndex !== -1) {
  //       const updatedProductRequests = [
  //         ...productRequests.slice(0, productReqIndex),
  //         ...productRequests.slice(productReqIndex + 1),
  //       ];

  //       setProductRequests(updatedProductRequests);

  //       router.push("/");
  //     }
  //   };

  return (
    <Drawer isOpen={open}>
      <div className="mx-6 md:mx-10">
        <div className="mt-[105px] flex h-10 w-full flex-col md:mt-[129px] md:items-center xl:mt-16">
          <div className="md:w-[672px] xl:w-[730px]">
            <h1 className="mt-6 text-2xl font-bold text-colour-800">
              Edit <span className="text-colour-600">#</span>
              {invoice?.id}
            </h1>

            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="font-bold text-colour-100">Bill From</h2>

              <Controller
                name="paymentTerms"
                control={control}
                rules={{
                  required: "Can't be empty",
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Street Address"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    errorMessage={errors.paymentTerms?.message}
                    className="mb-6"
                    maxLength={50}
                  />
                )}
              />
              <Button variant={3} className="px-6 py-4" onClick={onClose}>
                Discard
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
