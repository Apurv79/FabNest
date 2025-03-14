import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Collection,
  About,
  Contact,
  Product,
  Cart,
  Login,
  PlaceOrder,
  Orders,
  Verify,
} from "./pages/index";
import { Footer, Navbar, SearchBar } from "./components/index";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <div className="px-4 sm:px-[4vw] md:px-[7vw] lg:px-[9vw] ">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
