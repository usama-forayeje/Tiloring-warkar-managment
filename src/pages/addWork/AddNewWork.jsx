import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import moment from "moment";
import { ArrowLeft } from "lucide-react"; // Lucide icon for prev button
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from 'uuid';

import { getDatabase, push, ref, set } from "firebase/database";
import app from "@/database/firebaseConfig";
import { newWorkFormSchema } from "@/validations/validationSchema";
import { useEffect } from "react";
import { getUpdateDataOnEdit } from "@/database/firebaseUtils";



function AddNewWork() {
  const navigate = useNavigate();
  const params = useParams()
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newWorkFormSchema),
  });

  
  // Dynamic Data for Dropdowns
  const products = [
    { id: 1, name: "Elegant Queen Bed" },
    { id: 2, name: "Luxury Sofa Set" },
    { id: 3, name: "Dining Table" },
  ];
  const workers = [
    { id: 1122246, name: "Worker A" },
    { id: 11543, name: "Worker A" },
    { id: 11567, name: "Worker A" },
    { id: 1, name: "Worker A" },
    { id: 112, name: "Worker A" },
    { id: 11, name: "Worker A" },
  ];

  const masters = [
    { id: 78807, name: "Master Ali" },
    { id: 784634, name: "Master Ali" },
    { id: 78566, name: "Master Ali" },
    { id: 782333, name: "Master Ali" },
    { id: 7835, name: "Master Ali" },
    { id: 7854, name: "Master Ali" },
  ];
  const quantities = [1, ]; // Example quantity options

  const onSubmit = (data) => {
    // Format the date using Moment.js
    const formattedDate = moment(data.deliveryDate, "YYYY-MM-DD").format("MMMM Do, YYYY");
  
    const db = getDatabase(app);
  
    if (params.id) {
      // Update existing work
      set(ref(db, `newWorks/${params.id}`), { ...data, deliveryDate: formattedDate })
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: `Work has been updated successfully. Delivery Date: ${formattedDate}`,
            icon: "success",
            confirmButtonText: "OK",
          });
          reset(); // Reset the form
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update work. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    } else {
      // Add new work
      const uniqueId = uuidv4();
      set(ref(db, `newWorks/${uniqueId}`), { ...data, deliveryDate: formattedDate })
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: `Work has been added successfully. Delivery Date: ${formattedDate}`,
            icon: "success",
            confirmButtonText: "OK",
          });
          reset(); // Reset the form
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to add work. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
      }
      navigate(-1); // Go back to the previous page
  };
  
  // UseEffect to fetch data for editing
  useEffect(() => {
    async function getData() {
      try {
        const res = await getUpdateDataOnEdit("newWorks/" + params.id);
        console.log(res);
  
        if (res.deliveryDate) {
          // Convert the deliveryDate to "YYYY-MM-DD" format for the input
          res.deliveryDate = moment(res.deliveryDate, "MMMM Do, YYYY").format("YYYY-MM-DD");
        }
        reset(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    if (params.id) {
      getData();
    }
  }, [params.id, reset]);


  return (
    <div className="flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-3xl p-10 text-white shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl">
        <div className="flex items-center justify-between mb-8">
          {/* Prev Button */}
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center text-lg text-white hover:text-indigo-400"
          >
            <ArrowLeft size={24} className="mr-2" />
            <span>Go Back</span>
          </Button>
          <h2 className="text-4xl font-extrabold text-indigo-400">
            {params.id ? 'Update Work' : "Add New Work"}
            
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Order Number and Quantity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="orderNumber"
                className="block text-lg font-medium text-indigo-300"
              >
                Order Number
              </label>
              <input
                type="number"
                id="orderNumber"
                name="orderNumber"
                className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                {...register("orderNumber")}
              />
              {errors?.orderNumber && (
                <span className="text-sm text-red-500">
                  {errors?.orderNumber.message}
                </span>
              )}
            </div>

            {/* Quantity Dropdown */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-lg font-medium text-indigo-300"
              >
                Quantity
              </label>
              <select
                id="quantity"
                name="quantity"
                className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                {...register("quantity")}
              >
                <option value=''>Select quantity</option>
                {quantities.map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </select>
              {errors?.quantity && (
                <span className="text-sm text-red-500">
                  {errors?.quantity.message}
                </span>
              )}
            </div>
          </div>

          {/* Product Name Dropdown */}
          <div>
            <label
              htmlFor="productName"
              className="block text-lg font-medium text-indigo-300"
            >
              Product Name
            </label>
            <select
              name="productName"
              id="productName"
              className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
              {...register("productName")}
            >
              <option >Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
            {errors?.productName && (
              <span className="text-sm text-red-500">
                {errors?.productName.message}
              </span>
            )}
          </div>

          {/* Master Name and Worker Name */}
          {params.id &&
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="masterName"
                className="block text-lg font-medium text-indigo-300"
              >
                Master Name
              </label>
              <select
                name="masterName"
                id="masterName"
                className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                {...register("masterName")}
              >
                <option value={''}>Select a master</option>
                {masters.map((master) => (
                  <option key={master.id} value={master.name}>
                    {master.name}
                  </option>
                ))}
              </select>
              {errors?.masterName && (
                <span className="text-sm text-red-500">
                  {errors?.masterName.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="workerName"
                className="block text-lg font-medium text-indigo-300"
              >
                Worker Name
              </label>
              <select
                name="workerName"
                id="workerName"
                className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                {...register("workerName")}
              >
                <option value={''}>Select a worker</option>
                {workers.map((worker) => (
                  <option key={worker.id} value={worker.name}>
                    {worker.name}
                  </option>
                ))}
              </select>
              {errors?.workerName && (
                <span className="text-sm text-red-500">
                  {errors?.workerName.message}
                </span>
              )}
            </div>
          </div>
          }
          

          {/* Customer Name and Address */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="customerName"
                className="block text-lg font-medium text-indigo-300"
              >
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                {...register("customerName")}
              />
              {errors?.customerName && (
                <span className="text-sm text-red-500">
                  {errors?.customerName.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="CustomerNumber"
                className="block text-lg font-medium text-indigo-300"
              >
                Customer Phone Number
              </label>
              <input
                type="number"
                name="CustomerNumber"
                id="CustomerNumber"
                className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                {...register("CustomerNumber")}
              />
              {errors?.CustomerNumber && (
                <span className="text-sm text-red-500">
                  {errors?.CustomerNumber.message}
                </span>
              )}
            </div>
          </div>

          {/* Worker Rate and Delivery Date */}
          {params.id &&
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="workerRate"
                className="block text-lg font-medium text-indigo-300"
              >
                Worker Rate
              </label>
              <input
                type="number"
                name="workerRate"
                id="workerRate"
                className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                {...register("workerRate")}
              />
              {errors?.workerRate && (
                <span className="text-sm text-red-500">
                  {errors?.workerRate.message}
                </span>
              )}
            </div>

            
          </div>
           }
          <div>
              <label
                htmlFor="deliveryDate"
                className="block text-lg font-medium text-indigo-300"
              >
                Delivery Date
              </label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                {...register("deliveryDate")}
              />
              {errors?.deliveryDate && (
                <span className="text-sm text-red-500">
                  {errors?.deliveryDate.message}
                </span>
              )}
            </div>

          {/* Hidden Input for timestamp */}
          <input
            type="hidden"
            defaultValue={moment().format("YYYY-MM-DD HH:mm:ss")}
            {...register("timestamp")}
          />
          {/* Checkbox for Delivered */}
          {params.id && 
           <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="delivered"
              name="delivered"
              className="w-6 h-6 text-indigo-500 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
              {...register("delivered")}
            />
            <label
              htmlFor="delivered"
              className="text-lg font-medium text-indigo-300"
            >
              Delivered
            </label>
          </div>
          }
          

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full px-6 py-3 text-white transition duration-300 transform bg-indigo-600 rounded-lg shadow-md hover:scale-105 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500"
          >
            {params.id ? 'Update Work' : "Add New Work"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddNewWork;


