import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();
// Import Stripe from "stripe";

//payment gatewat intialization
// const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log("🔹 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
// console.log("🔹 RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// if (!razorpayInstance) {
//   console.log("🔴 Error in Razorpay instance creation");
// } else {
//   console.log("🟢 Razorpay instance created successfully");
// }

const currency = "inr";
const deliveryCharges = 40;

// placing orders using cod
const placeOrder = async (req, res) => {
  console.log("api end point hit");
  try {
    const { items, amount, address } = req.body;
    // console.log("order data", req.body);

    const user = req.user;
    const userId = user.id;
    // console.log("userId", userId);
    const orderData = {
      userId,
      items,
      amount,
      address,

      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    // console.log("order data", orderData);
    const newOrder = await orderModel.create(orderData);
    await newOrder.save();
    // console.log("bana gaya order place order me");

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    // console.log("cart khali kar diya");
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    // console.log("bhai placeorder me dikkat hai");
    res.json({ success: false, message: "Order not placed" });
  }
};

// placing using stripe
// const placeOrderStripe = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;
//     const originUrl = req.headers.origin;
//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,

//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     };
//     const newOrder = await orderModel.create(orderData);
//     await newOrder.save();
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: currency,
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));
//     line_items.push({
//       price_data: {
//         currency: currency,
//         product_data: {
//           name: "Delivery Fee",
//         },
//         unit_amount: deliveryCharges * 100,
//       },
//       quantity: 1,
//     });
//     const session = await stripe.checkout.sessions.create({
//       success_url: `${originUrl}/verfiy?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${originUrl}/verfiy?success=false&orderId=${newOrder._id}`,
//       line_items,
//       mode: "payment",
//     });
//     res.json({ success: true, id: session.id });
//   } catch (error) {
//     console.log("error in stripe payment");
//     res.json({ success: false, message: "Order not placed" });
//   }
// };

// placing order using razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    console.log("🔹 Order Data Received:", { items, amount, address });

    const userId = req.user?.id;
    console.log("🔹 User ID:", userId);

    if (!userId || !items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing order details" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    console.log("🔹 Creating Order in Database...");
    const newOrder = await orderModel.create(orderData);
    await newOrder.save();
    console.log("✅ Order Created in Database:", newOrder);

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    console.log("🔹 Sending Request to Razorpay:", options);

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error("❌ Razorpay Error:", error);
        console.log("❌ Order Not Placed - Razorpay Failed");
        return res
          .status(500)
          .json({ success: false, message: "Razorpay order failed" });
      }

      console.log("✅ Razorpay Order Created Successfully:", order);
      res
        .status(200)
        .json({ success: true, order, message: "Order placed successfully" });
    });
  } catch (error) {
    console.error("❌ Error in placeOrderRazorpay Backend:", error);
    return res
      .status(500)
      .json({ success: false, message: "Order not placed" });
  }
};

// all order data for admin panel
const allOrders = async (req, res) => {
  // console.log("✅ API endpoint hit for allOrders");

  try {
    const orders = await orderModel.find();
    // console.log("✅ Orders fetched successfully:", orders.length);
    res.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error in allOrders backend:", error); // ✅ Log full error
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//user order data for frontend
const userOrders = async (req, res) => {
  console.log("api point hit for userOrders");
  try {
    const user = req.user;
    const userId = user.id;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log("error in userOrders backend ");
    res.json({ success: false, message: "Error in fetching order data" });
  }
};

//udate order status from admin panel
const updateStatus = async (req, res) => {
  // console.log("api point hit for updateStatus");
  try {
    const { orderId, status } = req.body;
    // // console.log("order id", orderId);
    // console.log("status", status);
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log("error in updateStatus backend ");
    res.json({ success: false, message: "Error in updating order status" });
  }
};

//verfiy stripe payment
// const verifyStripe = async (req, res) => {
//   const { orderId, success, userId } = req.body;
//   try {
//     if (success == true) {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//       res.json({ success: true, message: "Payment verified" });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Payment failed" });
//     }
//   } catch (error) {
//     console.log("error in verify stripe backend ");
//     res.json({ success: false, message: "Error in verifying stripe payment" });
//   }
// };

const verifyRazorpay = async (req, res) => {
  try {
    console.log(req.body);
    const razorpay_order_id = req.body.response.razorpay_order_id;
    const userId = req.user.id;
    console.log("🔹 Razorpay Order ID:", razorpay_order_id);
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    // console.log("🔹 Order Info:", orderInfo);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order verified" });
    } else {
      res.json({ success: false, message: "Order not verified" });
    }
  } catch (error) {
    console.error("❌ Error in verifyRazorpay Backend:", error);
    return res
      .status(500)
      .json({ success: false, message: "Order not verified" });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyRazorpay,
};
// In this file, we have defined the functions to place an order using different payment methods, get all orders for the admin panel, get orders for the user, and update the status of the order.
