const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace the following with your MongoDB Atlas connection string
    // Format: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
    const mongoURI = process.env.MONGODB_URI || 'YOUR_CONNECTION_STRING_HERE';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 