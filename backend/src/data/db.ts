import mongoose, { Schema, Document, Model } from 'mongoose';

// Function to connect to MongoDB
async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://localhost:27017/your-database-name');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1); // Exit process with failure
    }
  }
  