/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom"; // For navigation
import logo from "../assets/LOGO.png";
import profile from "../assets/profile.png";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full flex justify-center items-center bg-white shadow-md">
      <div className="w-[90%] max-w-[1200px] flex justify-between items-center py-4">
        {/* Logo - Redirect to homepage */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-[100px] h-auto cursor-pointer" />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex justify-center items-center gap-8 font-semibold text-gray-700">
            <li className="hover:text-green-600 cursor-pointer">Home</li>
            <li className="hover:text-green-600 cursor-pointer">About Us</li>
            <li className="hover:text-green-600 cursor-pointer">Listing</li>
            <li className="hover:text-green-600 cursor-pointer">Contact Us</li>
          </ul>
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          <img
            src={profile}
            alt="profile"
            className="w-[40px] h-[40px] rounded-full border border-gray-300"
          />

          {/* Login/Register Links in Flex with Space */}
          <div className="flex gap-4 text-sm text-gray-700">
            <p className="hover:text-green-600 cursor-pointer">Login</p>
            <p className="hover:text-green-600 cursor-pointer">Register</p>
          </div>

          {/* Post Your Ad Button - Redirect to /post */}
          <Link to="/post">
            <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all">
              <span>Post Your Ad</span>
              <FaPlus />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
