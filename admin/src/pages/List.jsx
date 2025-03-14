import React, { useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = React.useState([]);
  // console.log("hi");
  const fetchlist = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      // console.log(response.data);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error("Error fetching products");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchlist();
  }, []);

  const removeProduct = async (id) => {
    try {
      const authToken = token || localStorage.getItem("token");
      if (!authToken) {
        console.error("No token found!");
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(response.data);
      if (response.data.success) {
        toast.success("Product removed successfully");
        fetchlist();
      } else {
        toast.error("Error removing product");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <p className="mb-2"> All Product List</p>
      <div className="flex flex-col gap-2 ">
        {/* list table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr]  items-center  bg-gray-200 p-2">
          <b>Image</b>
          <b>Name</b>

          <b>Category</b>

          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* display */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-col-[1fr_3fr_1fr] md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr]  items-center hover:bg-gray-50 transition-colors"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <p className="font-medium truncate px-3">{item.name}</p>
            <p className="text-gray-600 px-3">{item.category}</p>
            <p className="font-medium px-1">
              {currency}
              {item.price}
            </p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-center bg-red-500 text-white py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
