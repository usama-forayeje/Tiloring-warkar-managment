import AlertDialogModal from "@/components/ui/alartDialog";
import { Button } from "@/components/ui/button";
import { removeFirebaseData } from "@/database/firebaseUtils";
import { getNewWork, removeWork } from "@/features/newWork/newWorkSlice";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  CircleUserRound,
  Clock,
  Edit,
  Trash,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

function AllCustomers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef(null);
  const [deleteWorkId, setDeleteWorkId] = useState(null);

  const dispatch = useDispatch();
  const allWorkData = useSelector((state) => state.newWorks);

  useEffect(() => {
    dispatch(getNewWork());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      setDeleteWorkId(id);
      await removeFirebaseData("newWorks/" + id);
      console.log("Deleted Successfully!");
      // Dispatch action to remove the item from Redux state
      dispatch(removeWork(id));
    } catch (error) {
      console.error("Delete Failed:", error);
    }
  };

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
      <div key={index} className="block cursor-pointer">
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

          {/* Action Buttons */}
          <div className="flex mt-4 space-x-4">
            <Link>
              <Button
                onClick={() => setDeleteWorkId(item.id)}
                variant="destructive"
              >
                <Trash
                  className="-ms-1 me-1 opacity-60"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Delete
              </Button>
            </Link>
            <Link to={`/edit-work/${item.id}`}>
              <Button
                variant="outline"
                color="blue"
                // Assuming item.id exists for identification
                className="flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="absolute right-0 z-10 w-full p-4 -top-14">
      {deleteWorkId && (
        <AlertDialogModal
          title="Delete Confirmation"
          message="Are you sure you want to delete this work? This action cannot be undone."
          onConfirm={() => {
            console.log("Deleting item with ID:", deleteWorkId);
            handleDelete(deleteWorkId);
            setDeleteWorkId(null);
          }}
          onCancel={() => setDeleteWorkId(null)}
        />
      )}

      {/* Search Bar */}
      <div className="sticky top-[72px] rounded-md bg-white z-10 mb-6 flex items-center gap-4 shadow-sm py-8 px-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer name or order number..."
          className="flex-grow px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Filter Button */}
        <div className="relative" ref={filterMenuRef}>
          <button
            onClick={() => setIsFilterMenuOpen((prev) => !prev)}
            className="flex items-center px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200"
          >
            Filter
            <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
          </button>

          {isFilterMenuOpen && (
            <div className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-lg shadow-md">
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Filter by Name
              </button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Filter by New Date
              </button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Filter by Old Date
              </button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
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

export default AllCustomers;
