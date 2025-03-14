import React, { useEffect, useContext, use } from "react";
import { shopContext } from "../context/Shopcontext";
import { assets } from "../assets/assets";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const Collections = () => {
  const { products, search, showSearch } = useContext(shopContext);
  const [showfilter, setShowFilter] = React.useState(false);
  const [filterProduct, setFilterProduct] = React.useState([]);
  const [Category, setCategory] = React.useState([]);
  const [SubCategory, setSubCategory] = React.useState([]);

  const toogleCategory = (e) => {
    if (Category.includes(e.target.value)) {
      setCategory(Category.filter((item) => item !== e.target.value));
    } else {
      setCategory([...Category, e.target.value]);
    }
  };

  const toogleSubCategory = (e) => {
    if (SubCategory.includes(e.target.value)) {
      setSubCategory(SubCategory.filter((item) => item !== e.target.value));
    } else {
      setSubCategory([...SubCategory, e.target.value]);
    }
  };

  useEffect(() => {
    setFilterProduct(products);
  }, []);

  const handleFilterClick = (e) => {
    setShowFilter((prevState) => !prevState);
  };

  useEffect(() => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (Category.length > 0) {
      filtered = filtered.filter((product) =>
        Category.includes(product.category)
      );
    }

    if (SubCategory.length > 0) {
      filtered = filtered.filter((product) =>
        SubCategory.includes(product.subCategory)
      );
    }

    setFilterProduct(filtered);
  }, [Category, SubCategory, products, search, showSearch, products]);

  const handlesort = (e) => {
    setSort(e.target.value);
  };

  const [sort, setSort] = React.useState("relavent");
  useEffect(() => {
    let sorted = [...filterProduct];
    if (sort === "low-high") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    }
    if (sort === "high-low") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    }
    if (sort === "relavent") {
      sorted = [...products];
    }
    setFilterProduct(sorted);
  }, [sort]);

  return (
    <div className="flex flex-col sm:flex-row  gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={handleFilterClick}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden transform transition-transform duration-200 ${
              showfilter ? "rotate-90" : ""
            }`}
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5  py-3 mt-6 ${
            showfilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toogleCategory}
              />
              Men
            </p>
            <p className="flex gap">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toogleCategory}
              />
              Women
            </p>
            <p className="flex gap">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toogleCategory}
              />
              kids
            </p>
          </div>
        </div>
        {/* subcategoreis */}
        <div
          className={`border border-gray-300 pl-5  py-3 my-5 ${
            showfilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toogleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toogleSubCategory}
              />
              BottomWear
            </p>
            <p className="flex gap">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toogleSubCategory}
              />
              WinterWear
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* prodect sort */}
          <select
            className="appearance-none w-48 px-4 py-2 bg-white border border-gray-300 
    rounded-md text-sm text-gray-700 cursor-pointer transition-all duration-200 
    hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 
    focus:border-transparent shadow-sm"
            onChange={handlesort}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map product */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterProduct?.map((item, index) => {
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
    </div>
  );
};

export default Collections;
