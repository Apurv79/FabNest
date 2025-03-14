import React, { useEffect, useContext, useState } from "react";
import { shopContext } from "../context/Shopcontext";
import Title from "./../components/Title";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(shopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    try {
      const tempData = [];
      for (let items in cartItems) {
        for (let item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    } catch (error) {
      console.error("Error processing cart items:", error);
    }
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="border-t text-gray-700 border-b py-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                {/* Fixed Image Size Here */}
                <img
                  src={productData?.image[0]}
                  alt={productData?.name}
                  className="w-24 h-24 object-cover rounded-md" // Added this class
                />
                <div>
                  <p className="text-xs sm:text-xl font-light">
                    {productData?.name}
                  </p>
                  <div className="flex items-center mt-2 gap-5">
                    <p className="text-xs sm:text-lg font-light">
                      {currency} {productData?.price}
                    </p>
                    <p className="text-xs sm:text-lg font-light">
                      Size: {item?.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onClick={(e) => {
                  e.target.value === "" || e.target.value === 0
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      );
                }}
                type="number"
                min={1}
                defaultValue={item?.quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />
              <button
                onClick={() => {
                  updateQuantity(item._id, item.size, 0);
                  toast.success("Item removed from cart");
                }}
                className="group p-2 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center"
              >
                <img
                  src={assets.bin_icon}
                  alt="Remove item"
                  className="w-4 sm:w-5 cursor-pointer group-hover:scale-110 transition-transform "
                />
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              className="bg-black text-white text-sm my-8 px-8 py-3"
              onClick={() => {
                navigate("/place-order");
              }}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
