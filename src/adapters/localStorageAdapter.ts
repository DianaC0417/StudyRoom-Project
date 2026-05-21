import type { IPomodoroRepository } from '../../src/aplication/ports/IPomodoroRepository';
// Asegúrate de que tenga el "export" al principio
export class LocalStoragePomodoroAdapter implements IPomodoroRepository {
  private readonly KEY = 'pomodoro_end_time';
  saveTargetTime(timestamp: number): void {
    localStorage.setItem(this.KEY, timestamp.toString());
  }
  getTargetTime(): number | null {
    const time = localStorage.getItem(this.KEY);
    return time ? parseInt(time) : null;
  }
  clear(): void {
    localStorage.removeItem(this.KEY);
  }
}
