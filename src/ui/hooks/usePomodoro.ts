// ui/hooks/usePomodoro.ts
import { useState, useEffect } from 'react';
import { pomodoroService } from '../../config/dependencies'; // 👈 CAMBIO

interface PomodoroHook {
  timeDisplay: string;
  isActive: boolean;
  isBreak: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
}

export const usePomodoro = (
  workMinutes: number = 25,
  breakMinutes: number = 5
): PomodoroHook => {
  const [seconds, setSeconds] = useState<number>(() => {
    // 👈 USAMOS EL SERVICIO
    return pomodoroService.getWorkSeconds();
  });
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev: number) => {
          if (prev > 1) return prev - 1;

          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);
          setIsActive(false);

          const nextMinutes = nextIsBreak ? breakMinutes : workMinutes;
          // 👈 USAMOS EL SERVICIO
          pomodoroService.saveTime(nextMinutes);

          alert(nextIsBreak ? '¡Tiempo de descanso!' : '¡A trabajar!');

          return nextMinutes * 60;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isBreak, workMinutes, breakMinutes]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(workMinutes * 60);
    // 👈 USAMOS EL SERVICIO
    pomodoroService.saveTime(workMinutes);
  };

  const formatTime = (): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeDisplay: formatTime(),
    isActive,
    isBreak,
    toggleTimer,
    resetTimer,
  };
};
