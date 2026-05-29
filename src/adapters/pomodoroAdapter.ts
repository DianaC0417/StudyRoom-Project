import type { PomodoroRepository } from '../application/ports/PomodoroRepository';

const POMODORO_KEY = 'pomodoro_time';

export const pomodoroAdapter: PomodoroRepository = {
  getTime: (): number => {
    const time = localStorage.getItem(POMODORO_KEY);
    return time ? parseInt(time) : 25;
  },

  saveTime: (minutes: number): void => {
    localStorage.setItem(POMODORO_KEY, minutes.toString());
  },
};
