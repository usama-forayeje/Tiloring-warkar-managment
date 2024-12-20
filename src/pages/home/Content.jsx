import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewWork } from "@/features/newWork/newWorkSlice";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  CircleUserRound,
  Clock,
  LoaderCircle,
  Search,
  Truck,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function Content() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef(null);

  const dispatch = useDispatch();
  const allWorkData = useSelector((state) => state.newWorks);

  useEffect(() => {
    dispatch(getNewWork());
  }, [dispatch]);

  // Handle click outside of the filter menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setIsFilterMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [searchTerm]);

  // Filtered Data based on Search Term
  const filteredData = allWorkData?.newWork?.filter(
    (item) =>
      item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orderNumber?.toString().includes(searchTerm) ||
      item.CustomerNumber?.toString().includes(searchTerm)
  );

  // Reverse the filtered data to show the latest items first
  const reversedFilteredData = filteredData?.slice().reverse();

  let newWorkList;

  if (allWorkData.isLoading) {
    newWorkList = (
      <div className="flex flex-col gap-4">
        {/* Repeat Skeleton 4 times for better effect */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-full p-4 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse h-[100px]"
          >
            <div className="h-full space-y-4">
              <div className="w-3/4 h-4 bg-gray-400 rounded-md"></div>
              <div className="w-1/2 h-4 bg-gray-400 rounded-md"></div>
              <div className="w-full h-2 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (allWorkData.isError) {
    newWorkList = <div>Error: {allWorkData.error}</div>;
  } else if (
    !allWorkData.isLoading &&
    !allWorkData.isError &&
    (!filteredData || filteredData.length === 0)
  ) {
    newWorkList = (
      <div className="flex flex-col items-center justify-center mt-10">
        {/* Cute Emoji */}
        <div className="text-6xl animate-bounce">😢</div>

        {/* Message */}
        <h3 className="mt-4 text-xl font-semibold text-gray-700">
          Oops! No Data Found
        </h3>

        {/* Subtext */}
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your filters or adding new data.
        </p>

        {/* Sweet Animation */}
        <div className="relative w-64 h-64 mt-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-spin-slow blur-lg"></div>
          <div className="absolute bg-white rounded-full inset-4"></div>
        </div>
      </div>
    );
  } else {
    newWorkList = reversedFilteredData?.map((item, index) => (
      <Link
        key={index}
        to={`/edit-work/${item?.id}`}
        className="block cursor-pointer"
      >
        <div className="w-full p-6 transition duration-300 ease-in-out transform bg-white border rounded-lg shadow-md hover:shadow-lg">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center text-lg font-semibold text-indigo-600">
              <span className="mr-2 text-indigo-500">
                <CircleUserRound />
              </span>
              {item.customerName}
            </h3>
            <span
              className={`group flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-white rounded-full shadow-md transition-all duration-300 ${
                item.delivered
                  ? "bg-blue-500 hover:shadow-blue-400/50" // Delivered
                  : item.workerRate > 0
                  ? "bg-green-500 hover:shadow-green-400/50" // Completed
                  : item.masterName ||
                    item.workerName ||
                    item.workerRate !== undefined
                  ? "bg-yellow-500 hover:shadow-yellow-400/50" // Pending
                  : "bg-gray-500 hover:shadow-gray-400/50" // New
              }`}
              title={
                item.delivered
                  ? "This work has been delivered"
                  : item.workerRate > 0
                  ? "This work is completed"
                  : item.masterName ||
                    item.workerName ||
                    item.workerRate !== undefined
                  ? "This work is pending"
                  : "This work is new"
              }
            >
              {item.delivered ? (
                <>
                  <Truck className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Delivered</span>
                </>
              ) : item.workerRate > 0 ? (
                <>
                  <CheckCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Completed</span>
                </>
              ) : item.masterName ||
                item.workerName ||
                item.workerRate !== undefined ? (
                <>
                  <Clock className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Pending</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>New</span>
                </>
              )}
            </span>
          </div>

          {/* Card Content */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Quantity:</span>{" "}
                {item.quantity}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Order #:</span>{" "}
                {item.orderNumber}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">{item.deliveryDate}</p>
            </div>
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <div className="absolute right-0 z-10 w-full p-4 -top-12">
      {/* Search Bar */}
      <div className="sticky top-[72px] z-10 mb-6 bg-white shadow-md rounded-lg flex items-center justify-center lg:gap-8 p-4 sm:p-6 gap-4">
        {/* Search Input Section */}
        <div className="relative flex items-center flex-grow w-full max-w-lg gap-3">
          {/* Search Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full">
            {isLoading ? (
              <LoaderCircle
                className="animate-spin"
                size={18}
                strokeWidth={2}
                role="status"
                aria-label="Loading..."
              />
            ) : (
              <Search size={20} strokeWidth={2} aria-hidden="true" />
            )}
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone, or order..."
            className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm placeholder:ellipsis placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Filter Button */}
        <div className="relative">
          <Button
            onClick={() => setIsFilterMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Filter
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </Button>

          {isFilterMenuOpen && (
            <div
              ref={filterMenuRef}
              className="absolute right-0 z-20 w-48 mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg"
            >
              <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                Filter by Name
              </button>
              <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                Filter by New Date
              </button>
              <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                Filter by Old Date
              </button>
              <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filtered User Data */}

      <div className="mt-20 space-y-6 ">{newWorkList}</div>
    </div>
  );
}

export default Content;


