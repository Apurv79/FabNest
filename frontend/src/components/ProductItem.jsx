import React, { use } from "react";
import { shopContext } from "../context/Shopcontext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(shopContext);
  return <Link to={`/product/${id}`}>
    <div className="overflow-hidden">
        <img src={image[0]} alt=""  className="hover:scale-110 tranistion  ease-in-out" />
    </div>
    <p className="pt-3 pb-1 text-sm">{name}</p>
    <p className="text-sm font-medium">{currency}{price}</p> 
  </Link>;
};

export default ProductItem;
