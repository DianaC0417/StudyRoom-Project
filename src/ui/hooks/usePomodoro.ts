import { useState, useEffect } from 'react';
import { pomodoroService } from '../../config/dependencies';

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
  const [seconds, setSeconds] = useState<number>(workMinutes * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  // 1. EFECTO: Sincronización al cargar (Cura la amnesia del cronómetro)
  useEffect(() => {
    // Leemos directamente del localStorage para asegurar la persistencia del Timestamp
    const savedTarget = localStorage.getItem('pomodoro_target');
    
    if (savedTarget) {
      const targetTime = parseInt(savedTarget);
      const remaining = Math.round((targetTime - Date.now()) / 1000);

      if (remaining > 0) {
        setSeconds(remaining);
        setIsActive(true);
      } else {
        localStorage.removeItem('pomodoro_target');
      }
    }
  }, []);

  // 2. EFECTO: Motor del cronómetro
  useEffect(() => {
    let interval: any;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds <= 0 && isActive) {
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);
      setIsActive(false);
      
      const nextMinutes = nextIsBreak ? breakMinutes : workMinutes;
      setSeconds(nextMinutes * 60);
      
      // Limpiamos persistencia al terminar el ciclo
      localStorage.removeItem('pomodoro_target');
      pomodoroService.saveTime(0); 
      
      alert(nextIsBreak ? '¡Tiempo de descanso!' : '¡A trabajar!');
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, workMinutes, breakMinutes]);

  // 3. FUNCIONES DE CONTROL
  const toggleTimer = () => {
    if (!isActive) {
      // Guardamos en el servicio oficial para cumplir con la validación (minutos)
      const currentMinutes = Math.ceil(seconds / 60);
      pomodoroService.saveTime(currentMinutes);
      
      // Guardamos el Timestamp real para la prueba de fuego (F5)
      const targetTime = Date.now() + (seconds * 1000);
      localStorage.setItem('pomodoro_target', targetTime.toString());

      setIsActive(true);
    } else {
      setIsActive(false);
      pomodoroService.saveTime(0);
      localStorage.removeItem('pomodoro_target');
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(workMinutes * 60);
    pomodoroService.saveTime(0);
    localStorage.removeItem('pomodoro_target');
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