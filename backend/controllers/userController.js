import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Create token function
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

// Route for User Login
const loginUser = async (req, res) => {
    // res.json({message: "Login User API is working !"});
    try {
        // Destructure the req.body
        // when ever the user hits the login API the req.body will be stored in the email, password
        const {email, password} = req.body;

        // Check if user exists
        const user = await userModel.findOne({email});

        // If user does not exist
        if(!user){
            return res.status(400).json({success: false, message: "User does not exist"});
        }

        // Compare the password
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (isPasswordMatched) {
            const token = createToken(user._id);
            return res.status(200).json({success: true, message: "User logged in successfully", token});
        }else{
            return res.status(400).json({success: false, message: "Invalid Credentials"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}


// Route for register user
const registerUser = async (req, res) => {
    // res.json({message: "Register User API is working !"});

    try {
        // Destructure the req.body
        // when ever the user hits the register API the req.body will be stored in the name, email, password
        const {name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({email});

        // If user already exists
        if(existingUser){
            return res.status(400).json({success: false, message: "User already exists"});
        }

        // Validate email format & strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Invalid email format"});
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({success: false, message: "Password must be at least 8 characters long"});
        }

        // Hashing the user password
        const salt = await bcrypt.genSalt(10);
        // Hashing the user password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({name, email, password: hashedPassword});

        // Save the user
        const user = await newUser.save();

        const token = createToken(user._id);
        return res.status(201).json({success: true, message: "User registered successfully", token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}


// Route for admin login
const AdminLogin = async (req, res) => {
    // res.json({message: "Admin Login API is working !"});
    try {
        const {email, password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.status(200).json({success: true, message: "Admin logged in successfully", token});
        }else{
            return res.status(400).json({success: false, message: "Invalid Credentials"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message});
    }
}


export {loginUser, registerUser, AdminLogin}