import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        // Destructure the token from the req.headers
        const { token } = req.headers
        if (!token) {
            return res.status(401).json({success: false, message: "Unauthorized! Token not found"});
        }

        // verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // check if the token is valid
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success: false, message: "Unauthorized! You are not an admin"});
        }

        // if the token is valid
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message});
    }
}

export default adminAuth;