import React, { useEffect } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { shopContext } from "./../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = React.useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken, navigate, backendUrl } = useContext(shopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (currentState === "Sign Up") {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      // Success: Store Token & Navigate
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(`${currentState} successful!`);

        // Example: Navigate to products page
        // navigate("/products");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);

      // Improved Error Handling
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      action=""
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      onSubmit={onSubmitHandler}
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          required
          value={name}
        />
      )}
      <input
        type="email"
        placeholder="E-mail"
        className="w-full px-3 py-2 border border-gray-800"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="w-full relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-800"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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

      <div className="w-full flex justify-between  text-sm mt-[-8px]">
        {currentState === "Login" ? (
          <p className="cursor-pointer">Forgot Password?</p>
        ) : (
          ""
        )}
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Already have an account?
          </p>
        )}
      </div>
      <div className="bg-black text-white px-6 py-1  text-center cursor-pointer ">
        {currentState === "Login" ? (
          <button type="submit">SignIn</button>
        ) : (
          <button type="submit">SignUp</button>
        )}
      </div>
    </form>
  );
};

export default Login;
