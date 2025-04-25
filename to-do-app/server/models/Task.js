import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started',
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Task', taskSchema); 