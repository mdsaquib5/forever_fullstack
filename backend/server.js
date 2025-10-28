import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// import dotenv from "dotenv";
import "dotenv/config";

// App Config
const app = express();
// Port
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Api ends points
app.get("/", (req, res) => {
    res.send("Hello Backend API in Working!");
});

// User Route
app.use("/api/user", userRouter);
// when user hits this end point the userRouter function will be called

// Product Route
app.use("/api/product", productRouter);
// when user hits this end point the productRouter function will be called

// Cart Route
app.use("/api/cart", cartRouter);
// when user hits this end point the cartRouter function will be called

// Order Route
app.use("/api/order", orderRouter);

//  start the express server
app.listen(port, () => {
    console.log(`Server is Running on Port http://localhost:${port}`);
});