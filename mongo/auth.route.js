const express = require("express");
const router = express.Router();
const { loginAdmin, forgotPassword, createAdmin } = require("../controllers/loginAdmin.controller");

// Login route
router.post("/", loginAdmin);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Create Admin
router.post("/signup", createAdmin);
module.exports = router;

