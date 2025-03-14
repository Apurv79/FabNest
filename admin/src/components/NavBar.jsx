import React from "react";
import { assets } from "../assets/assets.js";
const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} alt="" className="w-36 rounded-full" />
      <button className="text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm bg-gray-700" onClick={() => setToken("")}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
