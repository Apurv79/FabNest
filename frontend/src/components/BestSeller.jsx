import React from "react";
import { shopContext } from "../context/Shopcontext";
import { Title, ProductItem } from "./index";
import { useContext, useEffect } from "react";

const BestSeller = () => {
  const { products } = useContext(shopContext);
  const [BestSellerProducts, setBestSellerProducts] = React.useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller);
    setBestSellerProducts(bestProducts.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Checkout our best selling products
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {BestSellerProducts.map((item, index) => {
          return (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
