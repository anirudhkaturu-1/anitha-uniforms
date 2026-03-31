import React from "react";
import { NavLink } from "react-router-dom";
import { FiPlusCircle, FiList, FiShoppingBag } from "react-icons/fi";

const SideBar = () => {
  return (
    <div className="fixed md:static bottom-0 left-0 w-full md:w-[14%] bg-white md:min-h-screen border-t md:border-t-0 md:border-r border-gray-300 flex md:flex-col justify-around md:justify-start md:gap-4 py-2 md:pt-6 z-50 shadow-md md:shadow-none">

      <NavLink
        to="/add"
        className={({ isActive }) =>
          `flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <FiPlusCircle size={24} />
        <p className="hidden md:block text-base font-medium">Add Product</p>
      </NavLink>

      <NavLink
        to="/list"
        className={({ isActive }) =>
          `flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <FiList size={24} />
        <p className="hidden md:block text-base font-medium">Product List</p>
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <FiShoppingBag size={24} />
        <p className="hidden md:block text-base font-medium">Orders</p>
      </NavLink>
    </div>
  );
};

export default SideBar;
