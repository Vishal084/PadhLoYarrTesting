const mongoose = require('mongoose'); 
require('dotenv').config();  

const connectToDatabase = async () => {     
  try {         
    await mongoose.connect(process.env.MONGO_URI);         
    console.log('✅ Connected to MongoDB Atlas');     
  } catch (error) {         
    console.error('❌ Error connecting to MongoDB:', error.message);         
    process.exit(1);     
  } 
};  

// Handle MongoDB errors 
mongoose.connection.on("error", (err) => {     
  console.error("❌ MongoDB connection error:", err); 
});  

module.exports = connectToDatabase;