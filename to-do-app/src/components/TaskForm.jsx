import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TaskForm({ isOpen, onClose, taskId = null, onTaskSaved }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'not-started',
    dueDate: '',
  });

  useEffect(() => {
    if (taskId) {
      fetchTask();
    } else {
      setTask({
        title: '',
        description: '',
        status: 'not-started',
        dueDate: '',
      });
    }
  }, [taskId, isOpen]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
      setTask({
        ...response.data,
        dueDate: new Date(response.data.dueDate).toISOString().slice(0, 16),
      });
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        await axios.put(`http://localhost:5000/api/tasks/${taskId}`, task);
      } else {
        await axios.post('http://localhost:5000/api/tasks', task);
      }
      onTaskSaved();
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {taskId ? 'Edit Task' : 'Create New Task'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="title"
              name="title"
              type="text"
              required
              value={task.title}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter task title"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={task.description}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter task description (optional)"
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <div className="mt-1">
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>  
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="dueDate"
              name="dueDate"
              type="datetime-local"
              required
              value={task.dueDate}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {taskId ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
} 