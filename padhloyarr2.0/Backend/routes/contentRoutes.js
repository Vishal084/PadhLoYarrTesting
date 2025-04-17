const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/roleMiddleware');

const {
  addModule,
  addSection,
  getCourseModules,
  getModuleSections,
  markSectionCompleted
} = require('../controllers/course/contentController');

// Course content routes
router.post('/:courseId/modules', authenticateUser, isAdmin, addModule);
router.post('/modules/:moduleId/sections', authenticateUser, isAdmin, addSection);
router.get('/:courseId/modules', getCourseModules);
router.get('/modules/:moduleId/sections', getModuleSections);
router.post('/:courseId/sections/:sectionId/complete', authenticateUser, markSectionCompleted);

module.exports = router;