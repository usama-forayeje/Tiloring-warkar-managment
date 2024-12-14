import * as yup from "yup";


export const  newWorkFormSchema = yup
.object({
  orderNumber: yup.number().required(),
  quantity: yup.number().required(),
  workerRate: yup.number(),
  deliveryDate: yup.date().required(),
  productName: yup.string().required(),
  masterName: yup.string(),
  workerName: yup.string(),
  customerName: yup.string().required(),
  CustomerNumber: yup.number().required(),
})
.required();