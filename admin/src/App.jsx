import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/list";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

function App() {
  const [token, setToken] = React.useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} setToken={token} />
                <Route path="/list" element={<List />} setToken={token} />
                <Route path="/orders" element={<Orders setToken={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
