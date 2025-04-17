const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const {
  createRazorpayOrder,
  verifyPayment,
} = require("../controllers/user/paymentController");

// Razorpay Routes
router.post("/create-order", authenticateUser, createRazorpayOrder);
router.post("/verify", authenticateUser, verifyPayment);

module.exports = router;