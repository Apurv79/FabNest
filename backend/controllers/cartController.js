import userModel from "../models/userModel.js";

// ✅ Ensure MongoDB detects changes
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

// ✅ Add Product to User Cart
const addToCart = async (req, res) => {
  //   console.log("api end points");
  //   console.log(req.body);
  try {
    const { itemID, size } = req.body;
    const user = req.user;
    const userID = user.id; // ✅ Get user ID from middleware
    // console.log("user", user);

    if (!size) {
      return res
        .status(400)
        .json({ success: false, message: "Size is required" });
    }

    // Fetch user data
    const userData = await userModel.findById(userID);
    console.log(userData);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // ✅ Ensure cartData is initialized

    // ✅ Add item to cart
    if (!cartData[itemID]) {
      cartData[itemID] = {};
    }
    cartData[itemID][size] = (cartData[itemID][size] || 0) + 1;

    // ✅ Force MongoDB to recognize nested update
    const updatedUser = await userModel.findByIdAndUpdate(
      userID,
      { $set: { [`cartData.${itemID}.${size}`]: cartData[itemID][size] } }, // ✅ Force update of nested object
      { new: true, upsert: true } // ✅ Return updated cart and create if missing
    );

    res.json({
      success: true,
      message: "Item added to cart",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Cart
const updateCart = async (req, res) => {
  //   console.log("api end points endndndndnn");
  try {
    const { itemID, size, quantity } = req.body;
    // console.log(req.body);

    if (quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quantity" });
    }

    // Fetch user data
    const user = req.user;
    // console.log("user", user);
    const userID = user.id; // ✅ Get user ID from middleware
    const userData = await userModel.findById(userID);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // ✅ Ensure cartData is initialized

    // ✅ Update cart quantity or remove item if quantity is 0
    if (cartData[itemID] && cartData[itemID][size] !== undefined) {
      if (quantity === 0) {
        delete cartData[itemID][size];

        // ✅ Remove item entry if no sizes left
        if (Object.keys(cartData[itemID]).length === 0) {
          delete cartData[itemID];
        }
      } else {
        cartData[itemID][size] = quantity;
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Item not found in cart" });
    }

    // ✅ Force MongoDB to recognize nested update
    const updatedUser = await userModel.findByIdAndUpdate(
      userID,
      { $set: { cartData: { ...cartData } } }, // ✅ Spread to force update
      { new: true }
    );

    res.json({
      success: true,
      message: "Cart updated",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get User Cart Data
const getUserCart = async (req, res) => {
  // console.log("api end points endndndndnn");
  try {
    const userID = req.user.id; // ✅ Get user ID from middleware

    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // ✅ Fetch only `cartData` for efficiency
    const userData = await userModel.findById(userID).select("cartData").lean();

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
