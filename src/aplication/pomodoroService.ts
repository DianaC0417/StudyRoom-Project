// application/pomodoroService.ts
import type { PomodoroRepository } from './ports/PomodoroRepository';

export const createPomodoroService = (pomodoroRepo: PomodoroRepository) => {
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
  };
};

export type PomodoroService = ReturnType<typeof createPomodoroService>;
