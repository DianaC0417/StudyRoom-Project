// application/pomodoroService.ts
import type { PomodoroRepository } from './ports/PomodoroRepository';
import type { IPomodoroRepository } from './ports/IPomodoroRepository';

export const createPomodoroService = (
  pomodoroRepo: PomodoroRepository,
  stateRepo: IPomodoroRepository
) => {
  return {
    getTime: (): number => {
      return pomodoroRepo.getTime();
    },

    saveTime: (minutes: number): void => {
      if (minutes < 1 || minutes > 60) {
        throw new Error('Tiempo inválido. Debe ser entre 1 y 60 minutos');
      }
      pomodoroRepo.saveTime(minutes);
    },

    getWorkSeconds: (): number => {
      return pomodoroRepo.getTime() * 60;
    },

    saveTargetTime(timestamp: number): void {
      stateRepo.saveTargetTime(timestamp);
    },

    getTargetTime(): number | null {
      return stateRepo.getTargetTime();
    },

    saveIsBreak(isBreak: boolean): void {
      stateRepo.saveIsBreak(isBreak);
    },

    getIsBreak(): boolean {
      return stateRepo.getIsBreak();
    },

    saveSession(session: number): void {
      stateRepo.saveSession(session);
    },

    getSession(): number {
      return stateRepo.getSession();
    },

    clearState(): void {
      stateRepo.clear();
    },
  };
};

export type PomodoroService = ReturnType<typeof createPomodoroService>;
