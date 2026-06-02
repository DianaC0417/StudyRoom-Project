import type { PomodoroSession } from '../../domain/PomodoroSession';

export interface PomodoroSessionRepository {
  saveSession(
    session: Omit<PomodoroSession, 'id' | 'created_at' | 'updated_at'>
  ): Promise<PomodoroSession>;
  updateSession(
    id: string,
    updates: Partial<
      Pick<PomodoroSession, 'end_time' | 'status' | 'duration_minutes'>
    >
  ): Promise<PomodoroSession>;
  getSessionsByUser(user_id: string): Promise<PomodoroSession[]>;
  getSessionById(id: string): Promise<PomodoroSession | null>;
}
