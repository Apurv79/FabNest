import React from "react";
import { Title, CartTotal } from "./../components/index";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = React.useState("cod");
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = React.useContext(shopContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log("formdata a raha ", formData);
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // console.log("order items", orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      // console.log("order data", orderData);
      // console.log("method", method);
      switch (method) {
        // api for cod
        case "cod":
          console.log("cod me a gye");
          const response = await axios.post(
            backendUrl + "/api/order/placeorder",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("response", response);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          //   const stripeResponse = await axios.post(
          //     backendUrl + "/api/order/placeorderstripe", {orderData} , { headers: { Authorization: `Bearer ${token}` } }
          //   );
          //  if (stripeResponse.data.success) {
          //   const {session_url}=stripeResponse.data;
          //   window.location.replace(session_url);
          //   }
          //   else{
          //     toast.error(stripeResponse.data.message);
          //   }

          toast.error("Stripe payment gateway is not implemented yet");
          break;
        case "razorpay":
          const token = localStorage.getItem("token");

          if (!token) {
            console.error("❌ No token found in localStorage!");
            toast.error("Please log in first!");
            return;
          }

          console.log("🔹 Token being sent:", token);

          const razorpayResponse = await axios.post(
            `${backendUrl}/api/order/placeorderrazorpay`,
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`, // ✅ Correct header format
              },
            }
          );

          console.log("🔹 Razorpay Response:", razorpayResponse);

          if (razorpayResponse.data.success) {
            initPay(razorpayResponse.data.order);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  const initPay = (order) => {
    console.log("order.id", order.id);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Payment for your order",
      order_id: order.id,
      receipt: order.receipt,
      handler: async function (response) {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            { response },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <form
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      onSubmit={onSubmitHandler}
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="Delivery" text2="Information" />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="city"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            type="text"
            placeholder="state"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="Number"
            placeholder="ZipCode"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
          />
        </div>
        <input
          type="Number"
          placeholder="Phone Number"
          className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
          onChange={onChangeHandler}
          name="phoneNumber"
          value={formData.phoneNumber}
          required
        />
      </div>
      {/* right side for thte place order */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          {/* payment method selection */}
          <div className="flex gap-2 flex-col lg:flex-row">
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("stripe")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "stripe"
                    ? "bg-blue-400 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-5" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("razorpay")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "razorpay"
                    ? "bg-blue-400 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="" className="h-5 mx-5" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "cod"
                    ? "bg-blue-400 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              className="bg-black text-white text-sm my-8 px-8 py-3"
              type="submit"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
