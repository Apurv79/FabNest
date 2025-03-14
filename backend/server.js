import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();

// text app configuration
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
const allowedOrigins = [
  "https://fab-nest-admin1.vercel.app",
  "https://fabnest.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  console.log("Welcome to the Express API");
  res.send("Welcome to the Express API");
});

// start the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
