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

import { useState, useEffect } from 'react';
import { LocalStoragePomodoroAdapter } from "../../infrastructure/adapters/localStorageAdapter";

// Instanciamos el adaptador (Infraestructura)
const repository = new LocalStoragePomodoroAdapter();

export const usePomodoro = (workMinutes: number = 25, breakMinutes: number = 5) => {
  const [seconds, setSeconds] = useState(workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // EFECTO 1: Sincronización al cargar (Soluciona el bug del audio)
  useEffect(() => {
    const savedTarget = repository.getTargetTime();
    if (savedTarget) {
      const remaining = Math.round((savedTarget - Date.now()) / 1000);
      if (remaining > 0) {
        setSeconds(remaining);
        setIsActive(true);
      } else {
        repository.clear();
      }
    }
  }, []);

  // EFECTO 2: Motor del cronómetro
  useEffect(() => {
    let interval: any;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds <= 0 && isActive) {
      // Lógica de cambio de ciclo (Trabajo -> Descanso)
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);
      setSeconds(nextIsBreak ? breakMinutes * 60 : workMinutes * 60);
      setIsActive(false);
      repository.clear();
      
      alert(nextIsBreak ? "¡Tiempo de descanso!" : "¡A trabajar!");
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, workMinutes, breakMinutes]);

  // FUNCIONES DE CONTROL
  const toggleTimer = () => {
    if (!isActive) {
      // FIX: Guardar inmediatamente al iniciar para que no se pierda el progreso
      const targetTime = Date.now() + (seconds * 1000);
      repository.saveTargetTime(targetTime);
      setIsActive(true);
    } else {
      setIsActive(false);
      repository.clear(); // Pausar limpia el target para evitar saltos de tiempo raros
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(workMinutes * 60);
    repository.clear();
  };

  // Formateo visual (MM:SS)
  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return { 
    timeDisplay: formatTime(),
    isActive, 
    isBreak,
    toggleTimer,
    resetTimer
  };
};