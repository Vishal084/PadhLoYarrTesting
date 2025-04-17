const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email format'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  cart: [{
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    quantity: { type: Number, default: 1 }
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
  progress: [{
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    completedModules: [{ type: String }],
    completion: { type: Number, default: 0 }
  }],
  purchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    purchasedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(`✅ Password hashed for user: ${this.email}`);
    next();
  } catch (err) {
    console.error("❌ Error hashing password:", err);
    next(err);
  }
});

// Compare plaintext password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) {
    throw new Error('Password field not selected in query');
  }
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log(`🔍 Password match result: ${isMatch}`);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);