const User = require('../../models/User');
const Course = require('../../models/Course');

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    const user = await User.findById(userId);
    if (!user.cart.includes(courseId)) {
      user.cart.push(courseId);
      await user.save();
    }

    res.status(200).json({ message: "Course added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const user = await User.findById(userId);
    user.cart = user.cart.filter(id => id.toString() !== courseId);
    await user.save();

    res.status(200).json({ message: "Course removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from cart", error: error.message });
  }
};

// Get Cart Items
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate({
      path: 'cart',
      select: 'title description price thumbnail instructor duration'
    });
    
    const cartWithQuantity = user.cart.map(course => ({
      ...course._doc,
      quantity: 1
    }));
    
    res.status(200).json(cartWithQuantity);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch cart", 
      error: error.message 
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCartItems
};