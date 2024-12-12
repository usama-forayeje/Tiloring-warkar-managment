import { Link } from "react-router-dom";
import { User } from "lucide-react";

function Header() {
  return (
    <header className="bg-gradient-to-r  fixed right-0 w-full top-0 z-20 from-indigo-600 to-blue-500 text-white p-4 shadow-md flex items-center justify-between">
      {/* Left Side: Logo */}
      <div className="flex items-center mt-1 gap-2">
        <img
          src="https://placehold.co/400"
          alt="Shop Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-xl font-semibold">ShopName</span>
      </div>

      {/* Middle: Shop Name */}
      <div className="hidden md:block text-lg font-medium text-center">
        Your Favorite Shopping Destination
      </div>

      {/* Right Side: Profile and Login */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-white hover:text-yellow-300">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
        <Link
          to="/login"
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 hover:text-white transition"
        >
          Log In
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      {/* <button
        className="block md:hidden text-white focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <LogIn className="w-6 h-6" /> : <User className="w-6 h-6" />}
      </button> */}
    </header>
  );
}

export default Header;
