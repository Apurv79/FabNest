import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets.js";
import { backendUrl } from "../App.jsx";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // console.log(email, password);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(email, password);
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/add");
        window.location.reload(true);
        // setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin panel</h1>
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={onSubmitHandler}
        >
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email "
              placeholder="Your Email"
              required
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
              >
                <img
                  src={showPassword ? assets.eye_off : assets.eye}
                  alt="toggle password"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
          <button className=" bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
