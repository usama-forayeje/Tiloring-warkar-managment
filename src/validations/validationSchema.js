import * as Yup from "yup";


export const newWorkFormSchema = Yup.object({
  orderNumber: Yup.number()
    .typeError("Order Number is mandatory and must be a number")
    .required("Order Number is mandatory and must be a number"), // সঠিক টাইপিং
  
  quantity: Yup.number() // Field name `quantitY` কে `quantity` করা হয়েছে
    .typeError("Please select a valid quantity")
    .required("Please select a valid quantity"),
  
  workerRate: Yup.number()
    .nullable(true), // Optional field
  
  workerName: Yup.string()
    .nullable(true), // Optional field
  
  deliveryDate: Yup.date() // Field name `deliverYDate` কে `deliveryDate` করা হয়েছে
    .typeError("Please provide a valid date")
    .required("Delivery Date is mandatory"), // সঠিক টাইপিং
  
  productName: Yup.string()
    .required("Product Name is required"),
  
  masterName: Yup.string()
    .nullable(true), // Optional field
  
  customerName: Yup.string()
    .required("Customer Name cannot be empty"), // সঠিক টাইপিং
  
  CustomerNumber: Yup.number()
    .typeError("Customer Number must be numeric")
    .required("Customer Phone Number is required"), // সঠিক টাইপিং
  
  delivered: Yup.boolean().default(false), // Default value for `delivered`
}).required();



export const registerFormSchema = Yup.object({
  firstName: Yup.string().required("First Name is mandatory."),
  lastName: Yup.string().required("Last Name is mandatory."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is mandatory."),
  password: Yup.string().required("Password is mandatory."),  // Add string() here
}).required();




export const signInFormSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is mandatory."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is mandatory."),
}).required();
