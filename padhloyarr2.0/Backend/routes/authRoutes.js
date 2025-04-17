const express = require("express");
const { 
  register, 
  login, 
  updateUserDetails, 
  deleteAccount, 
  logout,
  getCurrentUser 
} = require("../controllers/auth/authController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const router = express.Router();

// Signup Route
router.post("/signup", register);

// Get current user
router.get('/me', authenticateUser, getCurrentUser);

// Login Route
router.post("/login", login);

// Protected Routes (for authenticated users)
router.put("/update", authenticateUser, updateUserDetails);
router.delete("/delete", authenticateUser, deleteAccount);
router.post("/logout", authenticateUser, logout);

module.exports = router;