import type { IPomodoroRepository } from '../application/ports/IPomodoroRepository';

export class LocalStoragePomodoroAdapter implements IPomodoroRepository {
  private readonly KEY_TARGET = 'pomodoro_target';
  private readonly KEY_IS_BREAK = 'pomodoro_is_break';
  private readonly KEY_SESSION = 'pomodoro_session';

  saveTargetTime(timestamp: number): void {
    localStorage.setItem(this.KEY_TARGET, timestamp.toString());
  }

  getTargetTime(): number | null {
    const time = localStorage.getItem(this.KEY_TARGET);
    return time ? parseInt(time) : null;
  }

  saveIsBreak(isBreak: boolean): void {
    localStorage.setItem(this.KEY_IS_BREAK, isBreak.toString());
  }

  getIsBreak(): boolean {
    const isBreak = localStorage.getItem(this.KEY_IS_BREAK);
    return isBreak === 'true';
  }

  saveSession(session: number): void {
    localStorage.setItem(this.KEY_SESSION, session.toString());
  }

  getSession(): number {
    const session = localStorage.getItem(this.KEY_SESSION);
    return session ? parseInt(session) : 1;
  }

  clear(): void {
    localStorage.removeItem(this.KEY_TARGET);
    localStorage.removeItem(this.KEY_IS_BREAK);
    localStorage.removeItem(this.KEY_SESSION);
  }
}
