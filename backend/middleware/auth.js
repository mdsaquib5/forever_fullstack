import jwt from "jsonwebtoken";

// In this midddleware we will check if the user is logged in or not
// whenever the user add the product to the cart or update the cart or get the cart data
// we will check if the user is logged in or not

const authUser = (req, res, next) => {
    const {token} = req.headers;

    if (!token) {
        return res.status(401).json({success: false, message: "Not Authorized Login Again"});
    }
    try {
        // verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({success: false, message: error.message});
    }
}

export default authUser;

// Now will add this middleware in the cart Routes
// so whenever the user add the product to the cart or update the cart or get the cart data
// we will check if the user is logged in or not