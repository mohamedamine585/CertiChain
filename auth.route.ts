import express from "express";
const router = express.Router();
const { loginUser } = require("../controllers/Auth/login.controller");
const {
    forgotPasswordUser,
} = require("../controllers/Auth/forgotPassword.controller");
const { signupUser } = require("../controllers/Auth/signup.controller");
const checkAuth = require("../middlewares/client/check-auth");


router.post("/login", loginUser);
router.post("/forgot-password", forgotPasswordUser);
router.post("/signup", signupUser);
router.post("/reset-password", resetPasswordUser);