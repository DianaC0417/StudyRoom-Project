import type { TodoRepository } from './ports/TodoRepository';
import type { Task } from '../domain/Task';

export const createTodoService = (todoRepo: TodoRepository) => {
  return {
    getTasks: (): Task[] => {
      return todoRepo.getTasks();
    },
    saveTasks: (tasks: Task[]): void => {
      todoRepo.saveTasks(tasks);
    },
  };
};

export type TodoService = ReturnType<typeof createTodoService>;
