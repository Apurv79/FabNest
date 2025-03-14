import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const shopContext = createContext();

export const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 50;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // ✅ Ensure token is initialized

  const navigate = useNavigate();

  // ✅ Add to Cart Function
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = { ...cartItems };

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemID: itemId, size },
          { headers: { Authorization: `Bearer ${token}` } } // ✅ Fixed token header
        );
        toast.success("Item added to cart successfully!");
      } catch (error) {
        console.error("Error adding item to cart:", error);
        toast.error("Error adding item to cart");
      }
    }
  };

  // ✅ Get Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for (let item in cartItems) {
      for (let size in cartItems[item]) {
        if (cartItems[item][size] > 0) totalCount += cartItems[item][size];
      }
    }
    return totalCount;
  };

  // ✅ Update Quantity Function
  const updateQuantity = async (itemId, size, quantity) => {
    if (!cartItems[itemId]) return; // ✅ Prevents updating undefined item

    let cartData = { ...cartItems };
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.put(
          `${backendUrl}/api/cart/update`,
          { itemID: itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } } // ✅ Fixed token header
        );
        toast.success("Cart updated successfully");
      } catch (error) {
        console.log("Error updating cart:", error);
        toast.error("Error updating cart");
      }
    }
  };

  // ✅ Fetch User Cart
  const getUserCart = async () => {
    // console.log(token); // Debugging
    if (!token) return; // ✅ Prevent API call if token is missing

    try {
      const response = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Fixed token header
      });

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data || error.message
      );
      toast.error("Error fetching cart");
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (let item in cartItems) {
      for (let size in cartItems[item]) {
        try {
          const product = products.find((product) => product._id === item);
          totalAmount += product.price * cartItems[item][size];
        } catch (error) {
          console.log(error);
        }
      }
    }
    // console.log(totalAmount); // Debugging
    return totalAmount;
  };

  // ✅ Fetch Products
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.error("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ✅ Load Products on Component Mount
  useEffect(() => {
    getProductsData();
  }, []);

  // ✅ Load Cart on Component Mount (If Token Exists)
  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]); // ✅ Added dependency so it runs when token changes

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <shopContext.Provider value={value}>{props.children}</shopContext.Provider>
  );
};

export default ShopContextProvider;
