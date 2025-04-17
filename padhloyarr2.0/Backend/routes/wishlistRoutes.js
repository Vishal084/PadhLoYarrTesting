const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');

const { 
  addToWishlist, 
  removeFromWishlist, 
  getWishlistItems,
  moveToCart
} = require('../controllers/user/wishlistController');

// Wishlist routes
router.get('/', authenticateUser, getWishlistItems);
router.post('/', authenticateUser, addToWishlist);
router.delete('/:courseId', authenticateUser, removeFromWishlist);
router.post('/:courseId/move-to-cart', authenticateUser, moveToCart);

module.exports = router;