import { addDays } from "date-fns";
import { useState } from "react";
import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import useInvoiceStore from "@/lib/invoiceStore";
import { generateInvoiceID } from "@/lib/utils";
import type { Invoice } from "@/types";

import Button from "../shared/Button";
import Drawer from "../shared/Drawer";
import CustomDatePicker from "../shared/FormElements/CustomDatePicker";
import Input from "../shared/FormElements/Input";
import PullDownMenu from "../shared/FormElements/PullDownMenu";

interface InvoiceFormProps {
  invoice?: Invoice;
  open: boolean;
  onClose: () => void;
  mode: "edit" | "create";
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
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
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
  mode,
}: InvoiceFormProps): JSX.Element {
  const [saveType, setSaveType] = useState<"draft" | "send">("send");

  const { updateInvoice, createNewInvoice } = useInvoiceStore();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues:
      mode === "edit" && invoice != null
        ? {
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
            items: invoice.items,
          }
        : {
            // Default values for creating a new invoice
            senderStreetAddress: "",
            senderCity: "",
            senderPostCode: "",
            senderCountry: "",
            clientName: "",
            clientEmail: "",
            clientStreetAddress: "",
            clientCity: "",
            clientPostCode: "",
            clientCountry: "",
            invoiceDate: new Date(),
            paymentTerms: 30,
            projectDescription: "",
            items: [{ name: "", quantity: 1, price: 0 }],
          },
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "items",
  });

  const defaultPaymentTermIndex = paymentTermOptions.findIndex(
    (option) => option.value === invoice?.paymentTerms?.toString() || "30",
  );

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const existingIDs = useInvoiceStore
      .getState()
      .invoices.map((inv) => inv.id);
    const newInvoiceID = generateInvoiceID(existingIDs);

    if (mode === "edit" && invoice != null) {
      // Update existing invoice
      const updatedInvoice: Invoice = {
        ...invoice,
        senderAddress: {
          street: data.senderStreetAddress,
          city: data.senderCity,
          postCode: data.senderPostCode,
          country: data.senderCountry,
        },
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientAddress: {
          street: data.clientStreetAddress,
          city: data.clientCity,
          postCode: data.clientPostCode,
          country: data.clientCountry,
        },
        createdAt: data.invoiceDate.toISOString(),
        paymentTerms: data.paymentTerms,
        description: data.projectDescription,
        status: invoice.status === "draft" ? "pending" : invoice.status,
        items: data.items.map((item) => ({
          ...item,
          total: item.quantity * item.price,
        })),
        total: data.items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0,
        ),
      };

      updateInvoice(updatedInvoice);
    } else {
      // Create a new invoice
      const newInvoice: Invoice = {
        id: newInvoiceID,
        senderAddress: {
          street: data.senderStreetAddress,
          city: data.senderCity,
          postCode: data.senderPostCode,
          country: data.senderCountry,
        },
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientAddress: {
          street: data.clientStreetAddress,
          city: data.clientCity,
          postCode: data.clientPostCode,
          country: data.clientCountry,
        },
        createdAt: data.invoiceDate.toISOString(),
        paymentDue: addDays(
          new Date(data.invoiceDate),
          data.paymentTerms,
        ).toISOString(),
        paymentTerms: data.paymentTerms,
        description: data.projectDescription,
        status: saveType === "draft" ? "draft" : "pending",
        items: data.items.map((item) => ({
          ...item,
          total: item.quantity * item.price,
        })),
        total: data.items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0,
        ),
      };

      createNewInvoice(newInvoice);
      reset();
    }

    onClose();
  };

  const calculateTotal = (quantity: number, price: number): string => {
    return (quantity * price).toFixed(2);
  };

  return (
    <Drawer isOpen={open}>
      <div className="mx-6 md:mx-10">
        <div className="mt-[105px] flex h-10 w-full flex-col md:mt-[129px] md:items-center xl:mt-16">
          <div className="md:w-[672px] xl:w-[730px]">
            <h1 className="mt-6 text-2xl font-bold text-colour-800 dark:text-white">
              {mode === "edit" ? (
                <>
                  Edit <span className="text-colour-600">#{invoice?.id}</span>
                </>
              ) : (
                "Create New Invoice"
              )}
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

              <h2 className="my-6 font-bold text-[#777F98]">Item List</h2>

              {/* Header for md: and above */}
              {fields.length > 0 && (
                <div className="mb-2 hidden grid-cols-12 items-center gap-4 text-sm font-medium text-colour-700 dark:text-colour-500 md:grid">
                  <div className="col-span-5">Item Name</div>
                  <div className="col-span-2">Qty.</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Total</div>
                  <div className="col-span-1"></div>{" "}
                  {/* Empty column for delete icon */}
                </div>
              )}

              {fields.map((item, index) => {
                const quantity = watch(`items.${index}.quantity`);
                const price = watch(`items.${index}.price`);
                const total = calculateTotal(quantity, price);

                return (
                  <div
                    key={item.id}
                    className="mb-4 grid grid-cols-12 items-center gap-4"
                  >
                    {/* Item Name */}
                    <Controller
                      name={`items.${index}.name`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Item Name"
                          value={field.value}
                          onChange={field.onChange}
                          errorMessage={errors?.items?.[index]?.name?.message}
                          className="col-span-12 md:col-span-5"
                          hideLabelOnMd
                        />
                      )}
                    />

                    {/* Quantity */}
                    <Controller
                      name={`items.${index}.quantity`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Qty."
                          type="number"
                          min="0"
                          step="0.01"
                          value={field.value}
                          onChange={field.onChange}
                          errorMessage={
                            errors?.items?.[index]?.quantity?.message
                          }
                          className="col-span-3 md:col-span-2"
                          hideLabelOnMd
                        />
                      )}
                    />

                    {/* Price Input */}
                    <Controller
                      name={`items.${index}.price`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={field.value}
                          onChange={field.onChange}
                          errorMessage={errors?.items?.[index]?.price?.message}
                          className="col-span-4 md:col-span-2"
                          hideLabelOnMd
                        />
                      )}
                    />

                    {/* Total */}
                    <div className="col-span-4 flex flex-col md:col-span-2">
                      <label className="text-sm font-medium text-colour-700 dark:text-colour-500 md:hidden">
                        Total
                      </label>
                      <p className="mt-2 flex h-12 items-center font-semibold text-slate-600 dark:text-white md:text-base">
                        {total}
                      </p>
                    </div>

                    {/* Delete */}
                    <div className="col-span-1 flex h-12 items-center pt-5 md:col-span-1 md:pt-0">
                      <button
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                        className="transition-colors duration-200 ease-in-out focus:outline-none"
                        aria-label={`Remove item ${index + 1}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="16"
                          className="cursor-pointer fill-current hover:fill-red-600"
                        >
                          <path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="my-8 flex justify-between gap-2">
                <Button
                  variant={3}
                  className="px-3 py-4 md:px-6"
                  onClick={onClose}
                  type="button"
                >
                  Discard
                </Button>

                <div className="flex space-x-4">
                  {mode === "create" && (
                    <Button
                      type="submit"
                      variant={4}
                      className="whitespace-nowrap px-3 py-4 md:px-6"
                      onClick={() => {
                        setSaveType("draft");
                      }}
                    >
                      Save as Draft
                    </Button>
                  )}

                  <Button
                    type="submit"
                    variant={2}
                    className="whitespace-nowrap px-3 py-4 md:px-6"
                    onClick={() => {
                      setSaveType("send");
                    }}
                  >
                    {mode === "edit" ? "Save Changes" : "Save & Send"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
