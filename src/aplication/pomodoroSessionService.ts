import type { PomodoroSessionRepository } from './ports/PomodoroSessionRepository';
import type { PomodoroSession } from '../domain/PomodoroSession';

export interface PomodoroSessionService {
  startSession(
    user_id: string,
    duration_minutes: number
  ): Promise<PomodoroSession>;
  completeSession(
    sessionId: string,
    end_time?: string
  ): Promise<PomodoroSession>;
  cancelSession(sessionId: string, end_time?: string): Promise<PomodoroSession>;
  interruptSession(
    sessionId: string,
    end_time?: string
  ): Promise<PomodoroSession>;
  getUserSessions(user_id: string): Promise<PomodoroSession[]>;
  getSessionById(sessionId: string): Promise<PomodoroSession | null>;
}

export const createPomodoroSessionService = (
  repo: PomodoroSessionRepository
): PomodoroSessionService => {
  return {
    async startSession(user_id, duration_minutes) {
      const session: Omit<PomodoroSession, 'id' | 'created_at' | 'updated_at'> =
        {
          user_id,
          start_time: new Date().toISOString(),
          status: 'interrupted',
          duration_minutes,
        };
      return repo.saveSession(session);
    },

    async completeSession(sessionId, end_time = new Date().toISOString()) {
      return repo.updateSession(sessionId, {
        status: 'completed',
        end_time,
      });
    },

    async cancelSession(sessionId, end_time = new Date().toISOString()) {
      return repo.updateSession(sessionId, {
        status: 'cancelled',
        end_time,
      });
    },

    async interruptSession(sessionId, end_time = new Date().toISOString()) {
      return repo.updateSession(sessionId, {
        status: 'interrupted',
        end_time,
      });
    },

    async getUserSessions(user_id) {
      return repo.getSessionsByUser(user_id);
    },

    async getSessionById(sessionId) {
      return repo.getSessionById(sessionId);
    },
  };
};
