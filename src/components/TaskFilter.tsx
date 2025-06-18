import React from 'react';
import { TaskCategory } from '../types/Task';
import { taskCategories } from '../config/taskCategories';
import { Filter } from 'lucide-react';

interface TaskFilterProps {
  activeFilter: TaskCategory | 'all';
  onFilterChange: (filter: TaskCategory | 'all') => void;
  taskCounts: Record<TaskCategory | 'all', number>;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ 
  activeFilter, 
  onFilterChange, 
  taskCounts 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-800">Filter Tasks</h3>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`
            w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between
            ${activeFilter === 'all' 
              ? 'bg-gray-100 text-gray-800 font-medium' 
              : 'text-gray-600 hover:bg-gray-50'
            }
          `}
        >
          <span>All Tasks</span>
          <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
            {taskCounts.all}
          </span>
        </button>

        {Object.entries(taskCategories).map(([key, config]) => (
          <button
            key={key}
            onClick={() => onFilterChange(key as TaskCategory)}
            className={`
              w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between
              ${activeFilter === key 
                ? `${config.bgColor} ${config.color} font-medium` 
                : 'text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span>{config.icon}</span>
              <span>{config.label}</span>
            </div>
            <span className={`
              text-sm px-2 py-1 rounded-full
              ${activeFilter === key ? 'bg-white bg-opacity-50' : 'bg-gray-200'}
            `}>
              {taskCounts[key as TaskCategory]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};