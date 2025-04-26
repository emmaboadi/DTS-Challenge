import { useState } from 'react';
import taskService from '../services/taskService';
import { format } from 'date-fns';

export default function TaskSearch() {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchById = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) {
      setError('Please enter a task ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const task = await taskService.getTaskById(searchId);
      setSearchResult(task);
      setAllTasks([]);
    } catch (error) {
      setError('Task not found or invalid ID');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetAllTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tasks = await taskService.getAllTasks();
      setAllTasks(tasks);
      setSearchResult(null);
    } catch (error) {
      setError('Failed to fetch tasks');
      setAllTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'not-started':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const TaskCard = ({ task }) => (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{task.description || 'No description'}</p>
        </div>
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Due: {format(new Date(task.dueDate), 'MMM dd, yyyy HH:mm')}
      </div>
      <div className="mt-2 text-xs text-gray-400">
        ID: {task._id}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Search Tasks</h2>

        <div className="flex gap-4 mb-6">
          {/* Search by ID form */}
          <form onSubmit={handleSearchById} className="flex-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter task ID"
                className="flex-1 rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Search by ID
              </button>
            </div>
          </form>

          {/* Get all tasks button */}
          <button
            onClick={handleGetAllTasks}
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            Get All Tasks
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Search results */}
        {searchResult && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Search Result</h3>
            <TaskCard task={searchResult} />
          </div>
        )}

        {/* All tasks list */}
        {allTasks.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">All Tasks ({allTasks.length})</h3>
            <div className="space-y-4">
              {allTasks.map(task => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          </div>
        )}

        {/* No results message */}
        {!isLoading && !error && !searchResult && allTasks.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Use the search bar to find a specific task or click "Get All Tasks" to view all tasks.
          </div>
        )}
      </div>
    </div>
  );
} 