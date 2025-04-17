const express = require("express");
const router = express.Router();

const { 
  createCourse,
  getCourses,
  getCourseDetails,
  updateCourse,
  deleteCourse
} = require("../controllers/course/courseController");

const { authenticateUser } = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/roleMiddleware");

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourseDetails);

// Admin-only routes
router.post("/", authenticateUser, isAdmin, createCourse);
router.put("/:id", authenticateUser, isAdmin, updateCourse);
router.delete("/:id", authenticateUser, isAdmin, deleteCourse);

module.exports = router;