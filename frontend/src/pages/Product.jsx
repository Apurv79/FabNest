import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { shopContext } from "../context/Shopcontext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

import RelatedProducts from "./../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, cartItems } = useContext(shopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (products?.length > 0) {
      // ✅ Ensure products exist before searching
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product?.image?.[0] || ""); // ✅ Prevent errors if image array is empty
      }
    }
  }, [productId, products]); // ✅ Re-run when `products` updates

  // ✅ Loading state while data is being fetched
  if (!productData) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-2 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row items-start justify-center gap-8 sm:gap-12">
        {/* Left Section - Product Images */}
        <div className="flex-1 flex gap-3 sm:gap-6">
          {/* Thumbnail Images */}
          <div className="flex flex-col gap-3 sm:gap-4 overflow-y-auto max-h-[400px]">
            {productData?.image?.length > 0 ? (
              productData.image.map((item, index) => (
                <img
                  src={item}
                  alt="Thumbnail"
                  key={index}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover cursor-pointer rounded-md border hover:border-black"
                  onClick={() => setImage(item)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No images available</p>
            )}
          </div>

          {/* Main Product Image */}
          <div className="w-full sm:w-[75%]">
            <div className="aspect-[3/4] relative">
              <img
                src={image}
                alt="Product"
                className="w-full h-[400px] object-cover object-top rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="flex-1">
          <h1 className="text-xl font-medium mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img
                src={assets.star_icon}
                alt="Star"
                key={i}
                className="w-3.5"
              />
            ))}
            <img src={assets.star_dull_icon} alt="Star" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData?.size?.length > 0 ? (
                productData.size.map((item, index) => (
                  <button
                    key={index}
                    className={`border py-2 px-3 bg-gray-100 ${
                      size === item ? "border-orange-500" : ""
                    }`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No sizes available</p>
              )}
            </div>
          </div>
          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={() => {
              if (size) {
                addToCart(productData._id, size);
                toast.success("Added to cart!");
              } else {
                toast.error("Please select a size");
              }
            }}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery Available</p>
            <p>Easy Return and Exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Product Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <p className="border p-5  py-3 text-sm">Description</p>
          <p className="border p-5  py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col py-6 text-sm text-gray-500 gap-4 border">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum,
            provident doloremque? Vel tempore obcaecati quae odio illo neque,
            perspiciatis non voluptates in accusantium blanditiis quasi
            voluptatum nam odit dolorem sit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum,
            provident doloremque? Vel tempore obcaecati quae odio illo neque,
            perspiciatis non voluptates in accusantium blanditiis quasi
            voluptatum nam odit dolorem sit.
          </p>
        </div>
      </div>

      {/* Related Products Section */}
      {productData.category && productData.subCategory && (
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      )}
    </div>
  );
};

export default Product;
