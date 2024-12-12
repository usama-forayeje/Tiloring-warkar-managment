import { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";

function Content() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef(null);

  // Sample user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Bob Brown", email: "bob@example.com" },
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Bob Brown", email: "bob@example.com" },
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Bob Brown", email: "bob@example.com" },
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Bob Brown", email: "bob@example.com" },
  ];

  // Close filter menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setIsFilterMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter users based on search term and filter option
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (!filterOption) return matchesSearch;

    // Add filter logic here if options affect filtering
    return matchesSearch; // Placeholder for specific filter logic
  });

  return (
    <div className="p-4 absolute right-0 lg:w-9/12 md:w-9/12  w-full   z-10 ">
      {/* Search Bar */}
      <div className="sticky top-[72px]  rounded-md bg-white z-10  mb-6 flex items-center gap-4 shadow-sm py-8 px-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="flex-grow px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        {/* Filter Icon */}
        <div className="relative" ref={filterMenuRef}>
          <button
            onClick={() => setIsFilterMenuOpen((prev) => !prev)}
            className="p-2 bg-gray-100 border rounded-lg hover:bg-gray-200"
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>

          {isFilterMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-10">
              <button
                onClick={() => setFilterOption("name")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Filter by Name
              </button>
              <button
                onClick={() => setFilterOption("email")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Filter by Email
              </button>
              <button
                onClick={() => setFilterOption(null)}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Data */}
      <div className="space-y-4 overflow-y-auto mt-16  scrollbar-hide">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-md hover:bg-gray-100"
          >
            <div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
