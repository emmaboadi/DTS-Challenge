import Navbar from './components/Navbar';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <TaskList />
      </main>
    </div>
  );
}

export default App;
