import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Task from './models/Task.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const migrateTasks = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('MONGODB_URI is not defined in environment variables');
      process.exit(1);
    }
    
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Update all tasks with status 'pending' to 'not-started'
    const result = await Task.updateMany(
      { status: 'pending' },
      { $set: { status: 'not-started' } }
    );

    console.log(`Updated ${result.modifiedCount} tasks from 'pending' to 'not-started'`);
    
    await mongoose.connection.close();
    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateTasks();
