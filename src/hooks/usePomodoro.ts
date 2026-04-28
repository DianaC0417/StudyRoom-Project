import { useState, useEffect } from 'react';

// 1. Definimos qué estructura tiene lo que devuelve el hook
interface PomodoroHook {
  timeDisplay: string;
  isActive: boolean;
  isBreak: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
}

// 2. Aplicamos el tipo al hook
export const usePomodoro = (
  workMinutes: number = 25,
  breakMinutes: number = 5
): PomodoroHook => {
  const getInitialSeconds = (): number => {
    const saved = localStorage.getItem('pomodoro_time');
    return saved ? parseInt(saved) * 60 : workMinutes * 60;
  };

  const [seconds, setSeconds] = useState<number>(getInitialSeconds());
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>; // Tipo específico para intervalos

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev: number) => {
          if (prev > 1) return prev - 1;

          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);
          setIsActive(false);

          const nextMinutes = nextIsBreak ? breakMinutes : workMinutes;
          localStorage.setItem('pomodoro_time', nextMinutes.toString());

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
    const defaultSeconds = workMinutes * 60;
    setSeconds(defaultSeconds);
    localStorage.setItem('pomodoro_time', workMinutes.toString());
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
