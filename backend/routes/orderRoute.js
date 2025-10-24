import express from "express";
import { placeOrder, placeOrderRazorpay, updateStatus, allOrders, userOrders, verifyRazorpay } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// this route is for admin panel
orderRouter.post("/list", adminAuth, allOrders);
// this route is for update order status it is also admin panel route
orderRouter.post("/status", adminAuth, updateStatus);

// payment Route for COD
// whenever this api will hit we have to provide token in the header
orderRouter.post("/place", authUser, placeOrder);

// payment Route for Razorpay
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// user feature
orderRouter.post("/userorders", authUser, userOrders); 

// Verify Payment Route
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

export default orderRouter;