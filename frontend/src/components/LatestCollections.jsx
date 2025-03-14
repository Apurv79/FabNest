import React, { use } from "react";
import { shopContext } from "../context/Shopcontext";
import { useContext, useEffect } from "react";
import { Title, ProductItem } from "./index";
const LatestCollections = () => {
  const { products } = useContext(shopContext);
  const [LatestProducts, setLatestProducts] = React.useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Lastest"} text2={"Collections"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals - where timeless elegance meets
          contemporary style.
        </p>
      </div>
      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {LatestProducts.map((item, index) => {
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

export default LatestCollections;
