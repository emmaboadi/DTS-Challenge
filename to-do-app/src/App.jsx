import TaskList from './components/TaskList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <TaskList />
      </div>
    </div>
  );
}

export default App;
