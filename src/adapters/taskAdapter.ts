import type { Task } from '../domain/Task';
import type { TaskRepository } from '../aplication/ports/TaskRepository';

const API_URL = import.meta.env.VITE_API_URL;

export const taskAdapter: TaskRepository = {
  getTasksByUser: async (userId: string): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/user/${userId}`);
    const data = await response.json();
    return data.map((dbTask: any) => ({
      id: dbTask.id,
      text: dbTask.title,
      completed: dbTask.is_completed,
    }));
  },

  createTask: async (userId: string, text: string): Promise<Task> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, title: text.trim() }),
    });
    const dbTask = await response.json();
    return {
      id: dbTask.id,
      text: dbTask.title,
      completed: dbTask.is_completed,
    };
  },

  updateTaskStatus: async (id: string, isCompleted: boolean): Promise<void> => {
    await fetch(`${API_URL}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed: isCompleted }),
    });
  },

  deleteTask: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  }
};