import { TaskCategory, TaskCategoryConfig } from '../types/Task';

export const taskCategories: Record<TaskCategory, TaskCategoryConfig> = {
  leisure: {
    label: 'Leisure',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    icon: '🎯'
  },
  class: {
    label: 'Class',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: '📚'
  },
  meeting: {
    label: 'Meeting',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    icon: '👥'
  },
  other: {
    label: 'Other',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: '📋'
  }
};