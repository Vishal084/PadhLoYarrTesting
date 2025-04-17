// const Course = require('../../models/Course');
// const { isValidObjectId } = require('mongoose');
// const responseFormatter = require('../../utils/responseFormatter');

// // Create a new course
// exports.createCourse = async (req, res) => {
//   try {
//     const { title, description, price, thumbnail, instructor, category, duration } = req.body;

//     // Validation
//     if (!title || !description || !price || !instructor) {
//       return responseFormatter.error(res, 400, 'Missing required fields');
//     }

//     if (!isValidObjectId(instructor)) {
//       return responseFormatter.error(res, 400, 'Invalid instructor ID format');
//     }

//     const newCourse = new Course({
//       title,
//       description,
//       price,
//       thumbnail,
//       instructor,
//       category,
//       duration,
//     });

//     await newCourse.save();

//     return responseFormatter.success(res, 201, 'Course created successfully', newCourse);
//   } catch (error) {
//     return responseFormatter.error(res, 500, 'Error creating course', error.message);
//   }
// };

// // Delete a course
// exports.deleteCourse = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!isValidObjectId(id)) {
//       return responseFormatter.error(res, 400, 'Invalid course ID format');
//     }

//     const deletedCourse = await Course.findByIdAndDelete(id);

//     if (!deletedCourse) {
//       return responseFormatter.error(res, 404, 'Course not found');
//     }

//     return responseFormatter.success(res, 200, 'Course deleted successfully', deletedCourse);
//   } catch (error) {
//     return responseFormatter.error(res, 500, 'Error deleting course', error.message);
//   }
// };

// // Get course details
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!isValidObjectId(id)) {
//       return responseFormatter.error(res, 400, 'Invalid course ID format');
//     }

//     const course = await Course.findById(id)
//       .populate("instructor", "name")
//       .populate("reviews.user", "name");

//     if (!course) {
//       return responseFormatter.error(res, 404, 'Course not found');
//     }

//     return responseFormatter.success(res, 200, null, course);
//   } catch (error) {
//     return responseFormatter.error(res, 500, 'Error fetching course details', error.message);
//   }
// };

// // Get all courses
// exports.getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().populate("instructor", "name");
//     return responseFormatter.success(res, 200, null, courses);
//   } catch (error) {
//     return responseFormatter.error(res, 500, 'Failed to fetch courses', error.message);
//   }
// };

// // Update a course
// exports.updateCourse = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!isValidObjectId(id)) {
//       return responseFormatter.error(res, 400, 'Invalid course ID format');
//     }

//     const updates = req.body;
//     const updatedCourse = await Course.findByIdAndUpdate(id, updates, { 
//       new: true,
//       runValidators: true 
//     });

//     if (!updatedCourse) {
//       return responseFormatter.error(res, 404, 'Course not found');
//     }

//     return responseFormatter.success(res, 200, 'Course updated successfully', updatedCourse);
//   } catch (error) {
//     return responseFormatter.error(res, 500, 'Error updating course', error.message);
//   }
// };




const Course = require('../../models/Course');
const mongoose = require('mongoose');
const { isValidObjectId } = require('mongoose');
const { responseFormatter } = require('../../utils/responseFormatter');
const logger = require('../../utils/logger');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, description, price, thumbnail, instructor, category, duration } = req.body;

    // Validate required fields
    if (!title || !description || !price || !instructor) {
      logger.warn('Course creation failed: Missing required fields');
      return responseFormatter(res, 400, 'Missing required fields', null);
    }

    // Validate instructor ID format
    if (!isValidObjectId(instructor)) {
      logger.warn(`Invalid instructor ID format: ${instructor}`);
      return responseFormatter(res, 400, 'Invalid instructor ID format', null);
    }

    // Create new course
    const newCourse = new Course({
      title,
      description,
      price,
      thumbnail: thumbnail || '/default-course.jpg',
      instructor,
      category,
      duration,
      status: 'draft'
    });

    // Save course to database
    await newCourse.save();
    logger.info(`Course created successfully: ${newCourse._id}`);

    return responseFormatter(res, 201, 'Course created successfully', newCourse);

  } catch (error) {
    logger.error(`Error creating course: ${error.message}`);
    return responseFormatter(res, 500, 'Error creating course', error.message);
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate course ID format
    if (!isValidObjectId(id)) {
      logger.warn(`Invalid course ID format: ${id}`);
      return responseFormatter(res, 400, 'Invalid course ID format', null);
    }

    // Find and delete course
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      logger.warn(`Course not found for deletion: ${id}`);
      return responseFormatter(res, 404, 'Course not found', null);
    }

    logger.info(`Course deleted successfully: ${id}`);
    return responseFormatter(res, 200, 'Course deleted successfully', deletedCourse);

  } catch (error) {
    logger.error(`Error deleting course: ${error.message}`);
    return responseFormatter(res, 500, 'Error deleting course', error.message);
  }
};

// Get course details
const getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate course ID format
    if (!isValidObjectId(id)) {
      logger.warn(`Invalid course ID format: ${id}`);
      return responseFormatter(res, 400, 'Invalid course ID format', null);
    }

    // Find course and populate related data
    const course = await Course.findById(id)
      .populate('instructor', 'name email')
      .populate('reviews.user', 'name')
      .populate('students', 'name email');

    if (!course) {
      logger.warn(`Course not found: ${id}`);
      return responseFormatter(res, 404, 'Course not found', null);
    }

    logger.info(`Course details fetched: ${id}`);
    return responseFormatter(res, 200, null, course);

  } catch (error) {
    logger.error(`Error fetching course details: ${error.message}`);
    return responseFormatter(res, 500, 'Error fetching course details', error.message);
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    // Get query parameters
    const { status, category, instructor } = req.query;
    const filter = {};

    // Apply filters if provided
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (instructor && isValidObjectId(instructor)) filter.instructor = instructor;

    // Find courses with filters
    const courses = await Course.find(filter)
      .populate('instructor', 'name')
      .sort({ createdAt: -1 });

    logger.info(`Fetched ${courses.length} courses`);
    return responseFormatter(res, 200, null, courses);

  } catch (error) {
    logger.error(`Error fetching courses: ${error.message}`);
    return responseFormatter(res, 500, 'Error fetching courses', error.message);
  }
};

// Update a course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate course ID format
    if (!isValidObjectId(id)) {
      logger.warn(`Invalid course ID format: ${id}`);
      return responseFormatter(res, 400, 'Invalid course ID format', null);
    }

    // Validate instructor ID if provided
    if (updates.instructor && !isValidObjectId(updates.instructor)) {
      logger.warn(`Invalid instructor ID format: ${updates.instructor}`);
      return responseFormatter(res, 400, 'Invalid instructor ID format', null);
    }

    // Find and update course
    const updatedCourse = await Course.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedCourse) {
      logger.warn(`Course not found for update: ${id}`);
      return responseFormatter(res, 404, 'Course not found', null);
    }

    logger.info(`Course updated successfully: ${id}`);
    return responseFormatter(res, 200, 'Course updated successfully', updatedCourse);

  } catch (error) {
    logger.error(`Error updating course: ${error.message}`);
    return responseFormatter(res, 500, 'Error updating course', error.message);
  }
};

// Publish a course
const publishCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate course ID format
    if (!isValidObjectId(id)) {
      logger.warn(`Invalid course ID format: ${id}`);
      return responseFormatter(res, 400, 'Invalid course ID format', null);
    }

    // Publish the course
    const course = await Course.findByIdAndUpdate(
      id,
      { status: 'published', publishedAt: Date.now() },
      { new: true }
    );

    if (!course) {
      logger.warn(`Course not found for publishing: ${id}`);
      return responseFormatter(res, 404, 'Course not found', null);
    }

    logger.info(`Course published successfully: ${id}`);
    return responseFormatter(res, 200, 'Course published successfully', course);

  } catch (error) {
    logger.error(`Error publishing course: ${error.message}`);
    return responseFormatter(res, 500, 'Error publishing course', error.message);
  }
};

module.exports = {
  createCourse,
  deleteCourse,
  getCourseDetails,
  getCourses,
  updateCourse,
  publishCourse,
  ROLES: {
    ADMIN: 'admin',
    INSTRUCTOR: 'instructor',
    STUDENT: 'student'
  },
  COURSE_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived'
  },
  CONTENT_TYPES: ['video', 'text', 'quiz', 'pdf', 'assignment']
};