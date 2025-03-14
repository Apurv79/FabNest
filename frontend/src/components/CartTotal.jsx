import React from "react";
import { shopContext } from "../context/Shopcontext";
import Title from "./Title";
import { useContext } from "react";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(shopContext);
  return (
    <div className="w-full ">
      <div className="text-2xl">
        <Title tezt1={"Cart"} text2={"Total"} />
      </div>
      <div className="flex flex-col mt-2 gap-2 text-sm">
        <div className="flex justify-between ">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between ">
            <p>Shipping Fees</p>
            <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between ">
            <b>Total</b>
            <b>{currency}{getCartAmount()===0 ? 0 : getCartAmount()+delivery_fee}.00</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
