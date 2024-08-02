import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import type { Invoice } from "@/types";

import Button from "../shared/Button";
import Drawer from "../shared/Drawer";
import CustomDatePicker from "../shared/FormElements/CustomDatePicker";
import Input from "../shared/FormElements/Input";
import PullDownMenu from "../shared/FormElements/PullDownMenu";

interface InvoiceFormProps {
  invoice: Invoice;
  open: boolean;
  onClose: () => void;
}

interface FormInputs {
  senderStreetAddress: string;
  senderCity: string;
  senderPostCode: string;
  senderCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  invoiceDate: Date;
  paymentTerms: number;
  projectDescription: string;
}

const paymentTermOptions = [
  { label: "Next 1 Day", value: "1" },
  { label: "Next 7 Days", value: "7" },
  { label: "Next 14 Days", value: "14" },
  { label: "Next 30 Days", value: "30" },
];

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
      senderStreetAddress: invoice.senderAddress.street,
      senderCity: invoice.senderAddress.city,
      senderPostCode: invoice.senderAddress.postCode,
      senderCountry: invoice.senderAddress.country,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      clientStreetAddress: invoice.clientAddress.street,
      clientCity: invoice.clientAddress.city,
      clientPostCode: invoice.clientAddress.postCode,
      clientCountry: invoice.clientAddress.country,
      invoiceDate: new Date(invoice.createdAt),
      paymentTerms: invoice.paymentTerms,
      projectDescription: invoice.description,
    },
  });

  const defaultPaymentTermIndex = paymentTermOptions.findIndex(
    (option) => option.value === invoice.paymentTerms.toString(),
  );

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
                  name="senderStreetAddress"
                  control={control}
                  rules={{ required: "can't be empty" }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Street Address"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.senderStreetAddress?.message}
                      className="col-span-2 md:col-span-3"
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  name="senderCity"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="City"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.senderCity?.message}
                      className="col-span-1 md:col-span-1"
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  name="senderPostCode"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Post Code"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.senderPostCode?.message}
                      className="col-span-1 md:col-span-1"
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  name="senderCountry"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Country"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.senderCountry?.message}
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
                  required: "can't be empty",
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
                  required: "can't be empty",
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

              <div className="grid grid-cols-2 gap-6 md:grid-cols-6 md:gap-4">
                <Controller
                  name="clientStreetAddress"
                  control={control}
                  rules={{ required: "can't be empty" }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Street Address"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.senderStreetAddress?.message}
                      className="col-span-2 md:col-span-6"
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
                      errorMessage={errors.clientCity?.message}
                      className="col-span-1 md:col-span-2"
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
                      errorMessage={errors.clientPostCode?.message}
                      className="col-span-1 md:col-span-2"
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
                      errorMessage={errors.clientCountry?.message}
                      className="col-span-2 md:col-span-2"
                      maxLength={50}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="invoiceDate"
                  render={({ field }) => (
                    <CustomDatePicker
                      label="Invoice Date"
                      className="col-span-2 md:col-span-3"
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      selected={field.value}
                    />
                  )}
                />

                <Controller
                  name="paymentTerms"
                  control={control}
                  render={({ field: { onChange, value, ...restProps } }) => (
                    <PullDownMenu
                      label="Payment Terms"
                      className="col-span-2 md:col-span-3"
                      onChange={onChange}
                      options={paymentTermOptions}
                      defaultOptionIndex={defaultPaymentTermIndex}
                      {...restProps}
                    />
                  )}
                />

                <Controller
                  name="projectDescription"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Project Description"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.projectDescription?.message}
                      className="col-span-2 md:col-span-6"
                      maxLength={50}
                    />
                  )}
                />
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
