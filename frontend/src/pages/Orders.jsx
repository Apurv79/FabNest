import React, { useEffect } from "react";
import { useContext } from "react";
import { shopContext } from "../context/Shopcontext";
import Title from "./../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(shopContext);
  const [orderData, setOrderData] = React.useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      // console.log("try block working");
      const response = await axios.get(
        backendUrl + "/api/order/userorders",

        { headers: { Authorization: `Bearer ${token}` } }
      );
      // if (response.status === 401) {
      //   toast.error("Unauthorized access. Please log in again.");
      //   return;
      // }
      // console.log("response", response.data);
      if (response.data.success) {
        let allOrderItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["date"] = order.date;
            item["paymentMethod"] = order.paymentMethod;
            item["payment"] = order.payment;
            allOrderItem.push(item);
          });
        });
        // console.log("allOrderItem", allOrderItem);
        setOrderData(allOrderItem);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.log("error in userOrders front end ");
      toast.error("Error in fetching order data");
    }
  };
  useEffect(() => {
    // console.log("token", token);
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"Your"} text2={"Orders"} />
      </div>
      <div>
        {orderData.map((product, index) => (
          <div
            key={index}
            className="border-t p-4  border-b text-gray-700 flex flex-col md:flex-row items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={product.image[0]} alt="" className="w-16 sm:w-20" />
              <div>
                <p className="sm:text-base font-medium">{product.name}</p>
                <div className=" flex flex-row items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    <span className="font-medium">Price:</span> {currency}{" "}
                    {product.price}
                  </p>
                  <p>
                    <span className="font-medium">Qty:</span> {product.quantity}
                  </p>
                  <p>
                    <span className="font-medium">Size:</span> {product.size}
                  </p>
                </div>
                <p className="mt-2">
                  Date :{" "}
                  <span className="text-gray-400">
                    {new Date(product.date).toLocaleString()}
                  </span>
                </p>
                <p>
                  Payment Method :{" "}
                  <span className="text-gray-400">{product.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 min-h-2 rounded-full bg-green-400"></p>

                <p className="text-sm md:text-base">{product.status}</p>
              </div>
            </div>
            <button
              className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
              onClick={(e) => loadOrderData()}
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
