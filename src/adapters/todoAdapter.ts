import type { TodoRepository } from '../application/ports/TodoRepository';
import type { Task } from '../domain/Task';

const TASKS_KEY = 'studyroom_tasks';

export const todoAdapter: TodoRepository = {
  getTasks: (): Task[] => {
    const savedTasks = localStorage.getItem(TASKS_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  },
  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },
};
