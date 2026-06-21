import type { TaskRepository } from './ports/TaskRepository';
import type { Task } from '../domain/Task';

export const createTaskService = (repository: TaskRepository) => {
  return {
    getTasksByUser: (userId: string): Promise<Task[]> => {
      return repository.getTasksByUser(userId);
    },
    
    createTask: (userId: string, text: string): Promise<Task> => {
      return repository.createTask(userId, text);
    },
    
    updateTaskStatus: (id: string, isCompleted: boolean): Promise<void> => {
      return repository.updateTaskStatus(id, isCompleted);
    },
    
    deleteTask: (id: string): Promise<void> => {
      return repository.deleteTask(id);
    }
  };
};

export type TaskService = ReturnType<typeof createTaskService>;