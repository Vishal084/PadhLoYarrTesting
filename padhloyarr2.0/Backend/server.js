


// const express = require("express");
// const cors = require("cors");
// const morgan = require('morgan');
// require("dotenv").config();
// const mongoose = require('mongoose');
// const connectToDatabase = require("./config/db");

// // Import routes
// const authRoutes = require("./routes/authRoutes");
// const courseRoutes = require("./routes/courseRoutes");
// const contentRoutes = require('./routes/contentRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');
// const searchRoutes = require('./routes/searchRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const wishlistRoutes = require('./routes/wishlistRoutes');
// const paymentRoutes = require('./routes/paymentRoutes'); // Updated for Razorpay
// const progressRoutes = require('./routes/progressRoutes');

// // Middlewares
// const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

// const app = express();

// // Middleware setup
// app.use(express.json());
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Adjust based on your frontend
//   credentials: true
// }));
// app.use(morgan('dev'));

// // Database connection
// connectToDatabase();

// // Basic routes
// app.get("/", (req, res) => res.json({
//   status: "Running",
//   message: "PadhloYarr 2.0 Backend Service",
//   documentation: "Coming soon" // Add your docs link if available
// }));

// // Health check endpoint
// app.get('/health', async (req, res) => {
//   try {
//     const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
//     res.status(200).json({ 
//       status: 'OK',
//       services: {
//         database: dbStatus,
//         payment_gateway: process.env.RAZORPAY_KEY_ID ? 'Razorpay Configured' : 'Not Configured'
//       },
//       timestamp: new Date().toISOString(),
//       uptime: process.uptime()
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 'ERROR',
//       error: error.message
//     });
//   }
// });

// // API routes v1
// const API_VERSION = '/api/v1';
// app.use(`${API_VERSION}/auth`, authRoutes);
// app.use(`${API_VERSION}/courses`, courseRoutes);
// app.use(`${API_VERSION}/content`, contentRoutes);
// app.use(`${API_VERSION}/reviews`, reviewRoutes);
// app.use(`${API_VERSION}/search`, searchRoutes);
// app.use(`${API_VERSION}/cart`, cartRoutes);
// app.use(`${API_VERSION}/wishlist`, wishlistRoutes);
// app.use(`${API_VERSION}/payment`, paymentRoutes); // Razorpay endpoints
// app.use(`${API_VERSION}/progress`, progressRoutes);

// // Webhook endpoint for Razorpay (must come before other middlewares)
// app.post('/razorpay-webhook', express.raw({ type: 'application/json' }), (req, res) => {
//   // Handle Razorpay webhooks here
//   console.log('Webhook received:', req.body);
//   res.status(200).end();
// });

// // Error handling
// app.use(notFound);
// app.use(errorHandler);

// // Server startup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🔗 Payment Gateway: ${process.env.RAZORPAY_KEY_ID ? 'Razorpay Ready' : 'Not Configured'}`);
// });


const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
require("dotenv").config();
const mongoose = require('mongoose');
const connectToDatabase = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const contentRoutes = require('./routes/contentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const searchRoutes = require('./routes/searchRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Middlewares
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

const app = express();

// Enhanced CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Other middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Database connection
connectToDatabase();

// Request logger
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Basic routes
app.get("/", (req, res) => res.json({
  status: "Running",
  message: "PadhloYarr 2.0 Backend Service",
  api_version: "v1",
  base_path: "/api/v1"
}));

// Health check endpoint
app.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ 
    status: 'OK',
    services: {
      database: dbStatus,
      payment_gateway: process.env.RAZORPAY_KEY_ID ? 'Ready' : 'Not Configured'
    },
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API routes v1
const API_VERSION = '/api/v1';
app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/courses`, courseRoutes);
app.use(`${API_VERSION}/content`, contentRoutes);
app.use(`${API_VERSION}/reviews`, reviewRoutes);
app.use(`${API_VERSION}/search`, searchRoutes);
app.use(`${API_VERSION}/cart`, cartRoutes);
app.use(`${API_VERSION}/wishlist`, wishlistRoutes);
app.use(`${API_VERSION}/payment`, paymentRoutes);
app.use(`${API_VERSION}/progress`, progressRoutes);

// Webhook endpoint
app.post('/razorpay-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  console.log('Webhook received:', req.body);
  res.status(200).end();
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api/v1`);
  console.log(`🌍 Allowed Origins: ${allowedOrigins.join(', ') || 'All'}`);
  console.log(`💳 Payment Gateway: ${process.env.RAZORPAY_KEY_ID ? 'Ready' : 'Not Configured'}\n`);
});