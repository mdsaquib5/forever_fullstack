import userModel from '../models/userModel.js';

// Add products to Users Cart
const addToCart = async (req, res) => {
    try {
        // Destructure the userId, itemId, size from the req.body
        const {userId, itemId, size} = req.body;
        // find the user
        const userData = await userModel.findById(userId);
        // find the user cart
        const cartData = await userData.cartData;

        // if the item is already in the cart
        if (cartData[itemId]) {
            // if the size is already in the cart
            if (cartData[itemId][size]) {
                // increase the quantity
                cartData[itemId][size] += 1;
            } else {
                // add the size to the cart
                cartData[itemId][size] = 1;
            }
            // if the item is not in the cart
        } else {
            // add the item to the cart
            cartData[itemId] = {};
            // add the size to the cart
            cartData[itemId][size] = 1;
        }

        // update the user cart
        await userModel.findByIdAndUpdate(userId, {cartData});
        return res.status(200).json({success: true, message: "Product added to cart"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message});
    }
}

// update User Carts
const updateCart = async (req, res) => {
    // Destructure the userId, itemId, size, quantity from the req.body
    try {
        // find the user
        const {userId, itemId, size, quantity} = req.body;
        // find the user
        const userData = await userModel.findById(userId);
        // find the user cart
        const cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        // update the user cart
        await userModel.findByIdAndUpdate(userId, {cartData});
        return res.status(200).json({success: true, message: "Cart Updated"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message});
    }
}

// get user cart Data
const getUserCart = async (req, res) => {
    try {
        // Destructure the userId from the req.params
        const {userId} = req.body;
        // find the user
        const userData = await userModel.findById(userId);
        // find the user cart
        const cartData = await userData.cartData;

        return res.status(200).json({success: true, cartData});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message});
    }
}


export {addToCart, updateCart, getUserCart}

// After that we have to create routes for this controllers