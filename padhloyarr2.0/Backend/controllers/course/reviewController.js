const Course = require('../../models/Course');
const User = require('../../models/User');

// Add review to a course
const addReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1-5" });
    }
    
    // Check if user has purchased the course
    const user = await User.findById(userId);
    const hasPurchased = user.purchasedCourses.some(
      id => id.toString() === courseId
    );
    
    if (!hasPurchased) {
      return res.status(403).json({ 
        message: "You can only review courses you've purchased" 
      });
    }
    
    const course = await Course.findById(courseId);
    
    // Check if user has already reviewed
    const existingReviewIndex = course.reviews.findIndex(
      review => review.user.toString() === userId
    );
    
    if (existingReviewIndex !== -1) {
      // Update existing review
      course.reviews[existingReviewIndex].rating = rating;
      course.reviews[existingReviewIndex].comment = comment;
    } else {
      // Add new review
      course.reviews.push({
        user: userId,
        rating,
        comment,
        date: Date.now()
      });
    }
    
    // Update course average rating
    const totalRating = course.reviews.reduce((sum, review) => sum + review.rating, 0);
    course.averageRating = totalRating / course.reviews.length;
    
    await course.save();
    
    res.status(200).json({
      message: "Review added successfully",
      review: {
        rating,
        comment,
        user: req.user.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};

// Get reviews for a course
const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await Course.findById(courseId)
      .populate('reviews.user', 'name');
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    res.status(200).json({
      reviews: course.reviews,
      averageRating: course.averageRating
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};

module.exports = {
  addReview,
  getCourseReviews
};