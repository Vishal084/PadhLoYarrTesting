const Course = require('../../models/Course');

const searchCourses = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sort } = req.query;
    
    let query = {};
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    
    if (category) query.category = category;
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    let sortOptions = { createdAt: -1 }; // Default
    
    if (sort) {
      switch (sort) {
        case 'price_asc': sortOptions = { price: 1 }; break;
        case 'price_desc': sortOptions = { price: -1 }; break;
        case 'rating': sortOptions = { averageRating: -1 }; break;
      }
    }
    
    const courses = await Course.find(query)
      .sort(sortOptions)
      .populate('instructor', 'name');
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching courses",
      error: error.message
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category');
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message
    });
  }
};

module.exports = { searchCourses, getCategories };