const User = require('../../models/User');
const Course = require('../../models/Course');

// Add to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    const user = await User.findById(userId);
    if (!user.wishlist.includes(courseId)) {
      user.wishlist.push(courseId);
      await user.save();
    }

    res.status(200).json({ message: "Course added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to wishlist", error: error.message });
  }
};

// Remove from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const user = await User.findById(userId);
    user.wishlist = user.wishlist.filter(id => id.toString() !== courseId);
    await user.save();

    res.status(200).json({ message: "Course removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from wishlist", error: error.message });
  }
};

// Get Wishlist Items
const getWishlistItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('wishlist');
    
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist", error: error.message });
  }
};

// Move from Wishlist to Cart
const moveToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const user = await User.findById(userId);
    
    // Remove from wishlist
    user.wishlist = user.wishlist.filter(id => id.toString() !== courseId);
    
    // Add to cart if not already there
    if (!user.cart.includes(courseId)) {
      user.cart.push(courseId);
    }
    
    await user.save();

    res.status(200).json({ 
      message: "Course moved to cart", 
      wishlist: user.wishlist,
      cart: user.cart
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to move to cart", error: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlistItems,
  moveToCart
};