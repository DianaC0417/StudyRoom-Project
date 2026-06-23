import type { Task } from '../../domain/Task'

export interface TaskRepository {
  getTasksByUser(userId: string): Promise<Task[]>;
  createTask(userId: string, text: string): Promise<Task>;
  updateTaskStatus(id: string, isCompleted: boolean): Promise<void>;
  deleteTask(id: string): Promise<void>;
}