import * as yup from "yup";


export const newWorkFormSchema = yup
  .object({
    orderNumber: yup
      .number()
      .required("Order Number is mandatory and must be a number"),
    quantity: yup
      .number()
      .required("Please select a valid quantity"),
    workerRate: yup
      .number()
      .min(0, "Worker Rate must be a positive number"),
    deliveryDate: yup
      .date()
      .required("Delivery Date is mandatory")
      .typeError("Please provide a valid date"),
    productName: yup
      .string()
      .required("Product Name is required"),
    masterName: yup
      .string()
      .nullable(true), // Allows null or undefined if optional
    workerName: yup
      .string()
      .nullable(true),
    customerName: yup
      .string()
      .required("Customer Name cannot be empty"),
    CustomerNumber: yup
      .number()
      .typeError("Customer Number must be numeric")
      .required("Customer Phone Number is required"),
    delivered: yup
      .boolean()
      .default(false),
  })
  .required();
