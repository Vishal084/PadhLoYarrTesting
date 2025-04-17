const User = require("../models/User");

const isAdmin = (req, res, next) => {
  try {
    const user = req.user;

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Admin check failed", error: error.message });
  }
};

module.exports = isAdmin;