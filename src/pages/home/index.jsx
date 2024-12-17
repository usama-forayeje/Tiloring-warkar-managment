import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import { Outlet } from "react-router-dom";

function Main() {
  
  return (
    <div>
      {/* Static Header */}
      <div className="fixed top-0 right-0 z-20 w-full">
        <Header />
      </div>

      {/* Static Left Sidebar */}
      <div className="">
        <LeftSidebar />
      </div>

      {/* Dynamic Content */}
      <div className="absolute right-0 z-10 block w-full p-4 top-[55px] lg:w-9/12 md:w-9/12 ">
     
        <Outlet />
      </div>
      
    </div>
  );
}

export default Main;
