import LoginIcon from "@/components/ui/loginIcon";
import { useSelector } from "react-redux";

function Header() {
  const authUser = useSelector((state) => state.auth);
  console.log(authUser.user);
  return (
    <header className="flex items-center justify-between p-4 text-white shadow-md bg-gradient-to-r from-indigo-600 to-blue-500">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-2 mt-1">
        <img
          src="https://placehold.co/400"
          alt="Shop Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-xl font-semibold">
          {`${authUser?.user?.firstName} ${authUser?.user?.lastName}`}
        </span>
      </div>

      {/* Middle: Shop Name */}
      <div className="hidden text-lg font-medium text-center md:block">
        Your Favorite Shopping Destination
      </div>

      {/* Right Side: Profile and Login */}
      <div className="font-medium text-indigo-600 transition bg-white rounded-full hover:bg-yellow-400 hover:text-white">
        <LoginIcon  />
      </div>
    </header>
  );
}

export default Header;
