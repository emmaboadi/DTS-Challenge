import mongoose from 'mongoose';
import Task from '../models/Task.js';

describe('Task Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/taskmanager_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  it('should create a task successfully', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending',
      dueDate: new Date(),
    };

    const task = new Task(taskData);
    const savedTask = await task.save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe(taskData.title);
    expect(savedTask.description).toBe(taskData.description);
    expect(savedTask.status).toBe(taskData.status);
    expect(savedTask.dueDate).toBeDefined();
    expect(savedTask.createdAt).toBeDefined();
  });

  it('should require a title', async () => {
    const taskData = {
      description: 'Test Description',
      status: 'pending',
      dueDate: new Date(),
    };

    const task = new Task(taskData);
    await expect(task.save()).rejects.toThrow();
  });

  it('should require a due date', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending',
    };

    const task = new Task(taskData);
    await expect(task.save()).rejects.toThrow();
  });

  it('should validate status enum', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'invalid-status',
      dueDate: new Date(),
    };

    const task = new Task(taskData);
    await expect(task.save()).rejects.toThrow();
  });
}); 