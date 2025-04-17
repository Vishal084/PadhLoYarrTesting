const Course = require('../../models/Course');
const Module = require('../../models/Module');
const Section = require('../../models/Section');
const User = require('../../models/User');

// Add module to course
const addModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, order } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    // Verify the instructor is the one adding the module
    if (course.instructor.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to modify this course" });
    }
    
    const newModule = new Module({
      course: courseId,
      title,
      description,
      order
    });
    
    await newModule.save();
    
    res.status(201).json({
      message: "Module added successfully",
      module: newModule
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add module", error: error.message });
  }
};

// Add section to module
const addSection = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { title, content, contentType, duration, order } = req.body;
    
    const module = await Module.findById(moduleId).populate('course');
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    
    // Verify authorization
    if (module.course.instructor.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to modify this module" });
    }
    
    const newSection = new Section({
      module: moduleId,
      title,
      content,
      contentType, // video, text, quiz, etc.
      duration,
      order
    });
    
    await newSection.save();
    
    res.status(201).json({
      message: "Section added successfully",
      section: newSection
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add section", error: error.message });
  }
};

// Get all modules for a course
const getCourseModules = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const modules = await Module.find({ course: courseId })
      .sort({ order: 1 });
    
    res.status(200).json({ modules });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch modules", error: error.message });
  }
};

// Get all sections for a module
const getModuleSections = async (req, res) => {
  try {
    const { moduleId } = req.params;
    
    const sections = await Section.find({ module: moduleId })
      .sort({ order: 1 });
    
    res.status(200).json({ sections });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sections", error: error.message });
  }
};

// Mark section as completed
const markSectionCompleted = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, sectionId } = req.params;
    
    // Check if user has purchased the course
    const user = await User.findById(userId);
    const hasPurchased = user.purchasedCourses.some(
      id => id.toString() === courseId
    );
    
    if (!hasPurchased) {
      return res.status(403).json({ 
        message: "You must purchase this course to track progress" 
      });
    }
    
    // Find the user's progress for this course
    const progressIndex = user.progress.findIndex(
      p => p.course.toString() === courseId
    );
    
    if (progressIndex === -1) {
      // Initialize progress for this course
      user.progress.push({
        course: courseId,
        completedModules: [sectionId],
        completion: 0 // Will be calculated below
      });
    } else if (!user.progress[progressIndex].completedModules.includes(sectionId)) {
      // Add the section to completed modules
      user.progress[progressIndex].completedModules.push(sectionId);
    }
    
    // Calculate completion percentage
    const totalSections = await Section.countDocuments({ course: courseId });
    
    if (progressIndex !== -1 && totalSections > 0) {
      const completedCount = user.progress[progressIndex].completedModules.length;
      user.progress[progressIndex].completion = Math.round((completedCount / totalSections) * 100);
    }
    
    await user.save();
    
    res.status(200).json({
      message: "Section marked as completed",
      progress: progressIndex !== -1 ? user.progress[progressIndex] : user.progress[user.progress.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update progress", error: error.message });
  }
};

module.exports = {
  addModule,
  addSection,
  getCourseModules,
  getModuleSections,
  markSectionCompleted
};