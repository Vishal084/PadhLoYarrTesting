const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const updateProgress = require("../controllers/user/progressController");

router.put("/", authenticateUser, updateProgress);

module.exports = router;