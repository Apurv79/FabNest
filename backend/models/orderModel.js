import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});
const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
// This schema is for the orders placed by the user. It contains the user ID, the items in the order, the total amount, the address, the status of the order, the payment method, whether the payment is done or not, and the date of the order.
//
