import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: join(__dirname, '../../.env') });

const connectDB = async () => {
  try {
    // MongoDB connection string
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('MONGODB_URI is not defined in environment variables');
      console.log('Please create a .env file in the root directory with your MongoDB connection string');
      process.exit(1);
    }
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB; 