const User = require('../../models/User');

const updateProgress = async (req, res) => {
  const userId = req.user._id;
  const { courseId, completedModules, completion } = req.body;

  try {
    const user = await User.findById(userId);

    const progressIndex = user.progress.findIndex(
      (p) => p.course.toString() === courseId
    );

    if (progressIndex > -1) {
      user.progress[progressIndex].completedModules = completedModules;
      user.progress[progressIndex].completion = completion;
    } else {
      user.progress.push({ course: courseId, completedModules, completion });
    }

    await user.save();

    res.status(200).json({ message: "Progress updated", progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: "Error updating progress", error: error.message });
  }
};

module.exports = updateProgress;