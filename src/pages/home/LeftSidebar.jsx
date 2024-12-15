import { useSpring, animated } from "@react-spring/web";
import {
  ChevronDown,
  ChevronUp,
  Menu,
  PlusCircle,
  Settings,
  
  X,
  UserPlus,
  BarChart3,
  Users,
  Boxes,
  FileText,
  Share2,
  HardHat,
  Package,
  HelpCircle,
  Home,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function LeftSidebar() {
  const [showSettings, setShowSettings] = useState(false); // Settings Dropdown
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar Toggle State

  // Animation for Settings Dropdown
  const settingsAnimation = useSpring({
    height: showSettings ? "120px" : "0px",
    opacity: showSettings ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

 


  return (
    <div className=" fixed left-0 top-[75px]  z-50 h-screen w-5/12 flex">
      {/* Sidebar Section */}
      <div
        className={`w-64 overflow-auto pb-16 scrollbar-hide  bg-gradient-to-r z-20 bg-indigo-800 text-white px-6 py-4 fixed top-0 left-0 bottom-0 shadow-xl flex flex-col justify-between transition-all duration-500 transform ${
          isSidebarOpen ? "translate-x-0 pt-20 " : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64 md:block`}
      >
        {/* Navigation Links */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>
          <Link
            to="/add-work"
            className="flex items-center gap-2 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <UserPlus className="w-5 h-5" />
            Add Client
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/allCustomers"
            className="flex items-center gap-2 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <Users className="w-5 h-5" />
            Customers
          </Link>
          <Link
            to="/inventory"
            className="flex items-center gap-2 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <Boxes className="w-5 h-5" />
            Inventory
          </Link>
          <Link
            to="/invoice"
            className="flex items-center gap-2 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <FileText className="w-5 h-5" />
            Invoice
          </Link>
          <Link
            to="/account-sharing"
            className="flex items-center gap-2 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <Share2 className="w-5 h-5" />
            Account Sharing
          </Link>
          <Link
            to="/worker-management"
            className="flex items-center gap-2 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <HardHat className="w-5 h-5" />
            Worker Management
          </Link>

          {/* Settings Dropdown */}
          <button
            onClick={() => setShowSettings((prev) => !prev)}
            className="flex items-center justify-between w-full font-medium text-blue-200 transition duration-300 transform hover:text-yellow-300"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </div>
            {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <animated.ul
            style={settingsAnimation}
            className="pl-3 space-y-2 overflow-auto scrollbar-hide"
          >
            <Link
              to="/create"
              className="flex items-center gap-3 px-3 py-2 mt-4 font-medium transition-all duration-300 bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-600"
            >
              <PlusCircle className="w-4 h-4" />
              New Product
            </Link>
            <li className="flex items-center gap-3 px-3 py-2 font-medium transition-all duration-300 bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-600">
              <PlusCircle className="w-5 h-5" />
              New Category
            </li>
            <li className="flex p-3 px-3 py-2 mb-6 font-medium transition-all duration-300 bg-purple-500 rounded-lg cursor-pointer mbitems-center hover:bg-purple-600">
              <PlusCircle className="w-5 h-5" />
              New Level
            </li>
          </animated.ul>

          <Link
            to="/subscription"
            className="flex items-center gap-2 mt-4 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <Package className="w-5 h-5" />
            Subscription
          </Link>
          <Link
            to="/help"
            className="flex items-center gap-2 mt-4 mb-4 font-medium text-blue-200 duration-300 hover:text-white"
          >
            <HelpCircle className="w-5 h-5" />
            How To Use This Website
          </Link>
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <button
        className="fixed z-50 p-3 transition-all duration-300 transform bg-blue-700 rounded-full shadow-xl md:hidden top-4 left-4 hover:scale-110 hover:bg-blue-600"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>
    </div>
  );
}

export default LeftSidebar;
