import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import type { Invoice } from "@/types";

import Button from "../shared/Button";
import Drawer from "../shared/Drawer";
// import DatePicker from "../shared/FormElements/Datepicker";
import Input from "../shared/FormElements/Input";

interface InvoiceFormProps {
  invoice: Invoice;
  open: boolean;
  onClose: () => void;
}

interface FormInputs {
  companyStreetAddress: string;
  companyCity: string;
  companyPostCode: string;
  companyCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  invoiceDate: string;
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
      // paymentTerms: invoice?.paymentTerms,s
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
            <h1 className="mt-6 text-2xl font-bold text-colour-800 dark:text-white">
              Edit <span className="text-colour-600">#</span>
              {invoice?.id}
            </h1>

            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="my-6 font-bold text-colour-100">Bill From</h2>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-4">
                <Controller
                  name="companyStreetAddress"
                  control={control}
                  rules={{ required: "Can't be empty" }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Street Address"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.companyStreetAddress?.message}
                      className="col-span-2 md:col-span-3"
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  name="companyCity"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="City"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.companyCity?.message}
                      className="col-span-1 md:col-span-1"
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  name="companyPostCode"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Post Code"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.companyPostCode?.message}
                      className="col-span-1 md:col-span-1" // Adjusts to full width on sm and 1/3 on md
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  name="companyCountry"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Country"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.companyCountry?.message}
                      className="col-span-2 md:col-span-1"
                      maxLength={50}
                    />
                  )}
                />
              </div>

              <h2 className="my-6 font-bold text-colour-100">Bill To</h2>

              <Controller
                name="clientName"
                control={control}
                rules={{
                  required: "Can't be empty",
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Client's Name"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    errorMessage={errors.clientName?.message}
                    className="mb-6"
                    maxLength={50}
                  />
                )}
              />

              <Controller
                name="clientEmail"
                control={control}
                rules={{
                  required: "Can't be empty",
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Client's Email"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    errorMessage={errors.clientEmail?.message}
                    className="mb-6"
                    maxLength={50}
                  />
                )}
              />

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-4">
                <Controller
                  name="clientStreetAddress"
                  control={control}
                  rules={{ required: "Can't be empty" }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Street Address"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.companyStreetAddress?.message}
                      className="col-span-2 md:col-span-3"
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  name="clientCity"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="City"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.companyCity?.message}
                      className="col-span-1 md:col-span-1"
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  name="clientPostCode"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Post Code"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.companyPostCode?.message}
                      className="col-span-1 md:col-span-1" // Adjusts to full width on sm and 1/3 on md
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  name="clientCountry"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Country"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.companyCountry?.message}
                      className="col-span-2 md:col-span-1"
                      maxLength={50}
                    />
                  )}
                />

                {/* <Controller
                  name="invoiceDate"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <DatePicker
                      label="Invoice Date"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.invoiceDate?.message}
                      className="col-span-2 md:col-span-1"
                      maxLength={50}
                    />
                  )}
                /> */}
              </div>

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
