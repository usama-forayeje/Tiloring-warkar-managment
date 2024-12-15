import { Link } from "react-router-dom";
import { User } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 text-white shadow-md bg-gradient-to-r from-indigo-600 to-blue-500">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-2 mt-1">
        <img
          src="https://placehold.co/400"
          alt="Shop Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-xl font-semibold">ShopName</span>
      </div>

      {/* Middle: Shop Name */}
      <div className="hidden text-lg font-medium text-center md:block">
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
          className="px-4 py-2 font-medium text-indigo-600 transition bg-white rounded-lg hover:bg-yellow-400 hover:text-white"
        >
          Log In
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      {/* <button
        className="block text-white md:hidden focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <LogIn className="w-6 h-6" /> : <User className="w-6 h-6" />}
      </button> */}
    </header>
  );
}

export default Header;
