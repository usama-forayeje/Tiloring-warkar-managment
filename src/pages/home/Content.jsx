import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewWork } from "@/features/newWork/newWorkSlice";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

function Content() {
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

  // Filtered Data based on Search Term
  const filteredData = allWorkData?.newWork?.filter(
    (item) =>
      item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orderNumber?.toString().includes(searchTerm)
  );

  // Reverse the filtered data to show the latest items first
  const reversedFilteredData = filteredData?.reverse();

  return (
    <div className="absolute right-0 z-10 w-full p-4 lg:w-9/12 md:w-9/12">
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
      <div className="mt-8 space-y-6">
        {reversedFilteredData?.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="w-full p-6 transition duration-300 ease-in-out transform bg-white border rounded-lg shadow-md hover:scale-105"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{item.customerName}</h3>
              </div>

              {/* Card Content */}
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Order Number: {item.orderNumber}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-gray-600">{item.deliveryDate}</p>
                  <Button className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Content;
