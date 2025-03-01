require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (error) {
    console.error('Error connecting MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
