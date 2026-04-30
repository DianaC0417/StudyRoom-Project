// application/ports/PomodoroRepository.ts
export interface PomodoroRepository {
  getTime(): number;
  saveTime(minutes: number): void;
}
