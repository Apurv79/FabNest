import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { shopContext } from "../context/Shopcontext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    getCartCount,
    token,
    setToken,
  } = React.useContext(shopContext);
  const [Visible, setVisible] = React.useState(false);

  const removeToken = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex justify-between items-center py-5 font-medium">
      <Link to="/">
        {" "}
        <img src={assets.logo} className="w-36 rounded-full" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT US</p>
          <hr className="w-2/4 border none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt=""
            className="w-5 cursor-pointer"
          />
          {/* dropdown */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black ">My Profile</p>
                <p
                  className="cursor-pointer hover:text-black "
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>
                <p
                  className="cursor-pointer hover:text-black "
                  onClick={removeToken}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black  text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          alt=""
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>
      {/* side bar menu for mobile */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white tranistion-all ${
          Visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer "
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180 "
              alt=""
            />
            <p>Back</p>
          </div>
          <NavLink
            to="/"
            onClick={() => setVisible(false)}
            className="flex flex-col items-center gap-1 p-3"
          >
            <p>HOME</p>
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1 p-3"
            onClick={() => setVisible(false)}
          >
            <p>COLLECTIONS</p>
          </NavLink>
          <NavLink
            to="/about"
            className="flex flex-col items-center gap-1 p-3"
            onClick={() => setVisible(false)}
          >
            <p>ABOUT</p>
          </NavLink>
          <NavLink
            to="/contact"
            className="flex flex-col items-center gap-1 p-3"
            onClick={() => setVisible(false)}
          >
            <p>CONTACT US</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
