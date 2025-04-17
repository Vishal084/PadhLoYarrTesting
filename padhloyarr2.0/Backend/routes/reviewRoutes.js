const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');

const {
  addReview,
  getCourseReviews
} = require('../controllers/course/reviewController');

// Review routes
router.post('/:courseId/reviews', authenticateUser, addReview);
router.get('/:courseId/reviews', getCourseReviews);

module.exports = router;