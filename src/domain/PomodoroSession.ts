export type PomodoroSessionStatus = 'completed' | 'cancelled' | 'interrupted';

export interface PomodoroSession {
  id: string;
  user_id: string;
  start_time: string;
  end_time?: string | null;
  status: PomodoroSessionStatus;
  duration_minutes?: number | null;
  created_at: string;
  updated_at: string;
}
