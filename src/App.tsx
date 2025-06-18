import React, { useState, useMemo } from 'react';
import { Task, TaskCategory } from './types/Task';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { TaskFilter } from './components/TaskFilter';
import { Plus, CheckSquare } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Morning Yoga Session',
      description: 'Start the day with 30 minutes of yoga and meditation',
      category: 'leisure',
      completed: false,
      createdAt: new Date('2024-01-15'),
      dueDate: new Date('2024-01-20'),
      priority: 'medium'
    },
    {
      id: '2',
      title: 'React Advanced Concepts',
      description: 'Study hooks, context, and performance optimization',
      category: 'class',
      completed: false,
      createdAt: new Date('2024-01-14'),
      dueDate: new Date('2024-01-18'),
      priority: 'high'
    },
    {
      id: '3',
      title: 'Team Standup Meeting',
      description: 'Daily standup with the development team',
      category: 'meeting',
      completed: true,
      createdAt: new Date('2024-01-16'),
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Update Portfolio Website',
      description: 'Add new projects and update the design',
      category: 'other',
      completed: false,
      createdAt: new Date('2024-01-13'),
      dueDate: new Date('2024-01-25'),
      priority: 'low'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeFilter, setActiveFilter] = useState<TaskCategory | 'all'>('all');

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') return tasks;
    return tasks.filter(task => task.category === activeFilter);
  }, [tasks, activeFilter]);

  const taskCounts = useMemo(() => {
    const counts = {
      all: tasks.length,
      leisure: 0,
      class: 0,
      meeting: 0,
      other: 0
    };

    tasks.forEach(task => {
      counts[task.category]++;
    });

    return counts;
  }, [tasks]);

  const completedCount = tasks.filter(task => task.completed).length;

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;
    
    setTasks(prev => prev.map(task => 
      task.id === editingTask.id 
        ? { ...taskData, id: task.id, createdAt: task.createdAt }
        : task
    ));
    setEditingTask(null);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600 mb-6">
            Organize your tasks by category and stay productive
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{tasks.length - completedCount}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create New Task
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TaskFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-500">
                  {activeFilter === 'all' 
                    ? 'Create your first task to get started!' 
                    : `No tasks in the ${activeFilter} category yet.`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        editingTask={editingTask}
      />
    </div>
  );
}

export default App;