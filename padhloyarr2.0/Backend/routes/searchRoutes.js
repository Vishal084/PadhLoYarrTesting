const express = require('express');
const router = express.Router();
const { searchCourses, getCategories } = require('../controllers/course/searchController');

router.get('/courses', searchCourses);
router.get('/categories', getCategories);

module.exports = router;