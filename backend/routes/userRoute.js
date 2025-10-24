import express from "express";
import {loginUser, registerUser, AdminLogin} from "../controllers/userController.js";

// Router
const userRouter = express.Router();

// User Register
userRouter.post("/register", registerUser);
// when user hits this end point the registerUser function will be called

// User Login
userRouter.post("/login", loginUser);
// when user hits this end point the loginUser function will be called

// Admin Login
userRouter.post("/admin", AdminLogin);
// when user hits this end point the AdminLogin function will be called

// Export Router
export default userRouter;
// By using this router we will create the end points
// Go to server.js file and import this router