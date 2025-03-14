import express from "express";
import adminauth from "./../middleware/adminauth.js";
import authUser from "../middleware/auth.js";
import {
  placeOrder,
  // placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyRazorpay,
} from "../controllers/orderController.js";
//admin features
const orderRouter = express.Router();
orderRouter.get("/list", adminauth, allOrders);
orderRouter.post("/status", adminauth, updateStatus);

//payment feature
orderRouter.post("/placeorder", authUser, placeOrder);
// orderRouter.post("/placeorderstripe", authUser, placeOrderStripe);
orderRouter.post("/placeorderrazorpay", authUser, placeOrderRazorpay);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

//user features
orderRouter.get("/userorders", authUser, userOrders);
export default orderRouter;
// This file defines the routes for the order-related features. It imports the functions from the order controller and the authentication middleware. The routes are defined for admin features, payment features, and user features.
