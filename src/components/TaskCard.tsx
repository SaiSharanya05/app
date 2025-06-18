import React from 'react';
import { Task } from '../types/Task';
import { taskCategories } from '../config/taskCategories';
import { format } from 'date-fns';
import { Clock, Calendar, CheckCircle2, Circle, Trash2, Edit3 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onToggleComplete, 
  onDelete, 
  onEdit 
}) => {
  const categoryConfig = taskCategories[task.category];
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`
      p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
      ${categoryConfig.bgColor} ${categoryConfig.borderColor}
      ${task.completed ? 'opacity-75' : ''}
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="flex-shrink-0 transition-colors duration-200"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
          <div>
            <h3 className={`
              font-semibold text-lg
              ${task.completed ? 'line-through text-gray-500' : categoryConfig.color}
            `}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">{categoryConfig.icon}</span>
              <span className={`text-sm font-medium ${categoryConfig.color}`}>
                {categoryConfig.label}
              </span>
              <span className={`text-xs font-medium uppercase ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className={`text-sm mb-3 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Created {format(task.createdAt, 'MMM d, yyyy')}</span>
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span className={
              task.dueDate < new Date() && !task.completed 
                ? 'text-red-500 font-medium' 
                : ''
            }>
              Due {format(task.dueDate, 'MMM d, yyyy')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};