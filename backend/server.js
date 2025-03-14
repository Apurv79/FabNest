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
const allowedOrigins = [
  "https://fab-nest-admin1.vercel.app",
  "https://fabnest.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Allows cookies, authentication headers
    methods: "GET,POST,PUT,DELETE", // ✅ Allow these HTTP methods
    allowedHeaders: "Content-Type,Authorization", // ✅ Allow headers like Authorization
  })
);

// app.use(cors({ origin: "*" }));
app.use(express.json());
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
