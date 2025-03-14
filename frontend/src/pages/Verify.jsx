import React from "react";
import { shopContext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } =
    React.useContext(shopContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="mt-6 text-2xl font-medium text-gray-900">
          Payment Successful!
        </h2>

        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <Link
          to="/orders"
          className="mt-8 inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default Verify;
