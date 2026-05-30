import type { Task } from '../../domain/Task';

export interface TodoRepository {
  getTasks(): Task[];
  saveTasks(tasks: Task[]): void;
}
