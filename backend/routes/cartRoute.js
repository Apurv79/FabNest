import express from "express";
import authUser from "../middleware/auth.js";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

// ✅ Protect all cart routes with authentication middleware
// cartRouter.use(authUser);

// ✅ Get user cart (NO userID needed in URL)
cartRouter.get("/get", authUser, getUserCart);

// ✅ Add item to cart
cartRouter.post("/add", authUser, addToCart);

// ✅ Update cart
cartRouter.put("/update", authUser, updateCart);

export default cartRouter;
