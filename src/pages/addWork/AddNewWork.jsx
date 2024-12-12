import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import moment from "moment";
import { ArrowLeft } from "lucide-react"; // Lucide icon for prev button
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  orderNumber: yup.number().required("Order number is required"),
  quantity: yup.number().positive().integer().required("Quantity is required"),
  workerRate: yup.number().positive().integer().required("Worker rate is required"),
  deliveryDate: yup.date().required("Delivery date is required"),
  productName: yup.string().required("Product name is required"),
  masterName: yup.string(),
  workerName: yup.string(),
  customerName: yup.string().required("Customer name is required"),
  address: yup.string().required("Address is required"),
}).required();

function AddNewWork() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Dynamic Data for Dropdowns
  const products = [
    { id: 1, name: "Elegant Queen Bed" },
    { id: 2, name: "Luxury Sofa Set" },
    { id: 3, name: "Dining Table" },
  ];
  const workers = [
    { id: 1, name: "Worker A" },
    { id: 2, name: "Worker B" },
    { id: 3, name: "Worker C" },
  ];

  const masters = [
    { id: 1, name: "Master Ali" },
    { id: 2, name: "Master Karim" },
    { id: 3, name: "Master Rahim" },
  ];
  const quantities = [1, 2, 3, 5, 6, 7, 8, 9, 10]; // Example quantity options

  const onSubmit = (data) => {
    // Format the date using Moment.js
    const formattedDate = moment(data.deliveryDate, "YYYY-MM-DD").format(
      "MMMM Do, YYYY"
    );

    console.log("Formatted Data:", {
      ...data,
      deliveryDate: formattedDate,
      timestamp: data.timestamp,
    });

    // SweetAlert2 Success Message
    Swal.fire({
      title: "Success!",
      text: `Work has been added successfully. Delivery Date: ${formattedDate}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    // Reset the form after submission
    reset();
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-blue-500">
      <div className="w-full max-w-3xl bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-2xl rounded-xl p-10">
        <div className="flex justify-between items-center mb-8">
          {/* Prev Button */}
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center text-white text-lg hover:text-indigo-400"
          >
            <ArrowLeft size={24} className="mr-2" />
            <span>Go Back</span>
          </Button>
          <h2 className="text-4xl font-extrabold text-indigo-400">
            Add New Work
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Order Number and Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              {errors.orderNumber && (
                <span className="text-red-500 text-sm">
                  {errors.orderNumber.message}
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
                <option value={null}>Select quantity</option>
                {quantities.map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </select>
              {errors.quantity && (
                <span className="text-red-500 text-sm">
                  {errors.quantity.message}
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
              <option value={null}>Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
            {errors.productName && (
              <span className="text-red-500 text-sm">
                {errors.productName.message}
              </span>
            )}
          </div>

          {/* Master Name and Worker Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <option value={null}>Select a master</option>
                {masters.map((master) => (
                  <option key={master.id} value={master.name}>
                    {master.name}
                  </option>
                ))}
              </select>
              {errors.masterName && (
                <span className="text-red-500 text-sm">
                  {errors.masterName.message}
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
                <option value={null}>Select a worker</option>
                {workers.map((worker) => (
                  <option key={worker.id} value={worker.name}>
                    {worker.name}
                  </option>
                ))}
              </select>
              {errors.workerName && (
                <span className="text-red-500 text-sm">
                  {errors.workerName.message}
                </span>
              )}
            </div>
          </div>

          {/* Customer Name and Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              {errors.customerName && (
                <span className="text-red-500 text-sm">
                  {errors.customerName.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-lg font-medium text-indigo-300"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="w-full px-4 py-3 mt-2 text-white bg-gray-700 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                {...register("address")}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>

          {/* Worker Rate and Delivery Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              {errors.workerRate && (
                <span className="text-red-500 text-sm">
                  {errors.workerRate.message}
                </span>
              )}
            </div>

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
              {errors.deliveryDate && (
                <span className="text-red-500 text-sm">
                  {errors.deliveryDate.message}
                </span>
              )}
            </div>
          </div>

          {/* Hidden Input for timestamp */}
          <input
            type="hidden"
            defaultValue={moment().format("YYYY-MM-DD HH:mm:ss")}
            {...register("timestamp")}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 text-white transition duration-300 transform bg-indigo-600 rounded-lg shadow-md hover:scale-105 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500"
          >
            Add Work
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewWork;
