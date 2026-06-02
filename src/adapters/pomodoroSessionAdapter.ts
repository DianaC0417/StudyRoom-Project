import type { PomodoroSessionRepository } from '../aplication/ports/PomodoroSessionRepository';
import type { PomodoroSession } from '../domain/PomodoroSession';
import { apiClient } from './apiClient';

export const pomodoroSessionAdapter: PomodoroSessionRepository = {
  saveSession: async (
    session: Omit<PomodoroSession, 'id' | 'created_at' | 'updated_at'>
  ): Promise<PomodoroSession> => {
    const data = await apiClient('/pomodoro_sessions', {
      method: 'POST',
      body: JSON.stringify(session),
    });
    return data;
  },

  updateSession: async (
    id: string,
    updates: Partial<
      Pick<PomodoroSession, 'end_time' | 'status' | 'duration_minutes'>
    >
  ): Promise<PomodoroSession> => {
    const data = await apiClient(`/pomodoro_sessions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    return data;
  },

  getSessionsByUser: async (user_id: string): Promise<PomodoroSession[]> => {
    const data = await apiClient(`/pomodoro_sessions/user/${user_id}`);
    return data;
  },

  getSessionById: async (id: string): Promise<PomodoroSession | null> => {
    const data = await apiClient(`/pomodoro_sessions/${id}`);
    return data || null;
  },
};
