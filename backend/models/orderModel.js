import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    // User Details
    userId: { type: String, required: true },
    // Order Details
    items: { type: Array, required: true },
    // Payment Details
    amount: { type: Number, required: true },
    // Address Details
    address: { type: Object, required: true },
    // Order Status
    status: { type: String, required: true, default: "Order Placed" },
    // Payment Method
    paymentMethod: { type: String, required: true },
    // Payment Status
    payment: { type: Boolean, required: true, default: false },
    // Order Date
    date: { type: Number, required: true },

})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;