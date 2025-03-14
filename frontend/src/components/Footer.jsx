import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-100 w-full">
      <div className=" max-w-7xl mx-auto flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-4 my-10 mt-40 tex-sm py-10">
        <div className="space-y-4">
          <img
            src={assets.logo}
            alt="FabNest Logo"
            className="w-32 sm:w-40 md:w-48 hover:opacity-90 transition-opacity rounded-full"
          />
          <p className="w-full text-gray-500 mt-5 leading-relaxed">
            FabNest - Where comfort meets style. Discover curated fashion that
            celebrates your unique personality.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-medium mb-5 tracking-wide">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/">
              <li className="hover:text-gray-900 transition-colors cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hover:text-gray-900 transition-colors cursor-pointer">
                About Us
              </li>
            </Link>
            <li className="hover:text-gray-900 transition-colors cursor-pointer">
              Delivery
            </li>
            <li className="hover:text-gray-900 transition-colors cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-medium mb-5 tracking-wide">Get in Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="hover:text-gray-900 transition-colors cursor-pointer">
              +91 420-69-101
            </li>
            <li className="hover:text-gray-900 transition-colors cursor-pointer">
              xyz@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ febNest.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
