import React from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { backendUrl } from "./../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [image3, setImage3] = React.useState(null);
  const [image4, setImage4] = React.useState(null);

  const [name, setName] = React.useState("");
  const [discription, setdiscription] = React.useState("");
  const [category, setCategory] = React.useState("Men");
  const [subCategory, setsubCategory] = React.useState("Topwear");
  const [price, setPrice] = React.useState("");
  const [size, setSize] = React.useState([]);
  const [bestseller, setBestseller] = React.useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("discription", discription);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("size", JSON.stringify(size));
      formData.append("bestseller", bestseller);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // Get token from props or localStorage
      const authToken = token || localStorage.getItem("token");
      if (!authToken) {
        console.error("No token found!");
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Correct format
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //   console.log(response.data);
      if (response.data.success) {
        toast.success("Product added successfully");
        setName("");
        setdiscription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
       
       
     

      } else {
        toast.error("Error adding product");
      }
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  };

  return (
    <form
      action=""
      className="flex flex-col gap-4 w-full items-start"
      onSubmit={onSubmitHandler}
    >
      <div>
        <p className="mb-2">upload image</p>
        <div className="flex  gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload area"
              className="w-20"
            />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload area"
              className="w-20"
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload area"
              className="w-20"
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload area"
              className="w-20"
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          placeholder="type here "
          required
          className="w-full max-w-[500px] py-3 px-3"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Discription</p>
        <textarea
          type="text"
          placeholder="write content here "
          required
          className="w-full max-w-[500px] py-3 px-3"
          onChange={(e) => setdiscription(e.target.value)}
          value={discription}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-2 py-3"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product subCategory</p>
          <select
            className="w-full px-2 py-3"
            onChange={(e) => setsubCategory(e.target.value)}
            value={subCategory}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            type="number"
            placeholder="Enter the Price"
            required
            className="w-full px-3 py-2 sm:w-[120px] "
            min={0}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Size</p>
        <div className="flex gap-2 text-white ">
          <div>
            <p
              className={`${
                size.includes("S") ? "bg-slate-500" : "bg-slate-400"
              } cursor-pointer px-3 py-1`}
              onClick={() =>
                setSize((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                )
              }
            >
              S
            </p>
          </div>
          <div>
            <p
              className={`${
                size.includes("M") ? "bg-slate-500" : "bg-slate-400"
              } cursor-pointer px-3 py-1`}
              onClick={() =>
                setSize((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
            >
              M
            </p>
          </div>
          <div>
            <p
              className={`${
                size.includes("L") ? "bg-slate-500" : "bg-slate-400"
              } cursor-pointer px-3 py-1`}
              onClick={() =>
                setSize((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
            >
              L
            </p>
          </div>
          <div>
            <p
              className={`${
                size.includes("XL") ? "bg-slate-500" : "bg-slate-400"
              } cursor-pointer px-3 py-1`}
              onClick={() =>
                setSize((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"]
                )
              }
            >
              XL
            </p>
          </div>
          <div>
            <p
              className={`${
                size.includes("XXL") ? "bg-slate-500" : "bg-slate-400"
              } cursor-pointer px-3 py-1`}
              onClick={() =>
                setSize((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                )
              }
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={(e) => setBestseller(e.target.checked)}
          checked={bestseller}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to BestSeller
        </label>
      </div>
      <button
        className="bg-slate-500 px-5 w-36 text-white py-2 mt-4 rounded-full"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
