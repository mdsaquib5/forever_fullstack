import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";

// gateway initialize
const razorpayInstance = new razorpay({
    key_id: "rzp_test_RXD61QMWqsvwRO",
    key_secret: "n6Daeb4cyyyGXIKhVnEFJb12",
});

// global Variables
const deliveryCharge = 10;
const currency = "INR"

// Placing Order using COD method
const placeOrder = async (req, res) => {
    try {
        // destructure the data from the request body
        const { userId, items, amount, address } = req.body;
        
        // create order data
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        
        // create new order
        const newOrder = new orderModel(orderData);
        // save order
        await newOrder.save();
        // empty cart
        await userModel.findByIdAndUpdate(userId, {cartData: {} });
        // return response
        res.status(200).json({success: true, message: "Order placed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

const placeOrderRazorpay = async (req, res) => {
    try {
        // destructure the data from the request body
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        // create new order
        const newOrder = new orderModel(orderData);
        // save order
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error);
                res.status(500).json({success: false, message: error.message });
            }
            // return response
            res.status(200).json({success: true, order, message: "Order placed successfully", });
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const {userId, razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        // console.log(orderInfo);
        if(orderInfo.status === "paid"){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {} });
            res.status(200).json({success: true, message: "Payment verified successfully" });
        }else{
            res.status(200).json({success: false, message: "Payment Failed" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

// All orders data from admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({success: true, orders });

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

// User orders data for frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;

        const orders = await orderModel.find({userId});
        res.status(200).json({success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

// Update orders status from admin panel
const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;

        await orderModel.findByIdAndUpdate(orderId, {status});
        res.status(200).json({success: true, message: "Order status updated successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

export {
    placeOrder,
    placeOrderRazorpay,
    verifyRazorpay,
    allOrders,
    userOrders,
    updateStatus
}