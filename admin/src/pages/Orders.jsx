import React from "react";
import { use } from "react";
import axios from "axios";
import { useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = (token) => {
  const [orders, setOrders] = React.useState([]);
  const fetchAllOrders = async () => {
    const authToken = localStorage.getItem("token");

    // console.log("🔹 Token before sending request:", authToken);
    // console.log("🔹 Type of token:", typeof authToken);

    // console.log("🔹 Token before sending request:", authToken);
    // console.log("🔹 Type of token:", typeof authToken);
    if (!authToken || typeof authToken !== "string") {
      console.error("❌ Invalid token format:", authToken);
      return;
    }

    if (!authToken) {
      console.error("❌ No token found!");
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { Authorization: `Bearer ${authToken}` }, // ✅ Correct header format
      });

      // console.log("✅ Orders Data:", response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        console.error("❌ Error fetching orders:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "❌ Error fetching orders:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const statusHandler = async (orderId, event) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
    console.log(orders);
  }, [token]);
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        📦 Your Orders
      </h1>

      {/* Orders Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-105"
          >
            {/* Order Header */}
            <div className="flex items-center gap-4">
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <p className="text-lg font-semibold text-gray-800">
                Order #{index + 1}
              </p>
            </div>

            {/* Order Items */}
            <div className="mt-4 space-y-1">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-gray-600">
                  {item.name} X {item.quantity}{" "}
                  <span className="text-gray-400">
                    {item.size}
                    {idx !== order.items.length - 1 && ","}
                  </span>
                </p>
              ))}
            </div>

            {/* Customer Address */}
            <div className="mt-4 p-3 border rounded-lg bg-gray-50">
              <p className="font-semibold text-gray-800">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {order.address.street}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipCode}
              </p>
              <p className="text-sm text-gray-600">
                📞 {order.address.phoneNumber}
              </p>
            </div>

            {/* Order Details */}
            <div className="mt-4">
              <p className="text-gray-700">
                <span className="font-semibold">Items:</span>{" "}
                {order.items.length}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Payment:</span>{" "}
                {order.payment ? "✅ Done" : "❌ Pending"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span>{" "}
                {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
              </p>
            </div>

            {/* Order Amount */}
            <p className="mt-4 text-lg font-bold text-gray-800">
              {currency} {order.amount}
            </p>

            {/* Order Status Dropdown */}
            <select
              className="mt-4 w-full p-2 border rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring"
              value={order.status}
              onChange={(e) => statusHandler(order._id, event)}
            >
              <option value="Order Placed">📦 Order Placed</option>
              <option value="Packing">📦 Packing</option>
              <option value="Shipped">🚛 Shipped</option>
              <option value="Out for Delivery">🚚 Out for Delivery</option>
              <option value="Delivered">✅ Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
