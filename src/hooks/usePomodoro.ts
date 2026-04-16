import { useState, useEffect } from 'react';
//  Conectamos con el trabajo de Di
import { localStorageAdapter } from '../adapters/localStorageAdapter';

export const usePomodoro = (workMinutes: number = 25, breakMinutes: number = 5) => {
  // 1. Intentamos leer si ya había un tiempo guardado 
  const initialSeconds = localStorageAdapter.getPomodoro() * 60;
  const [seconds, setSeconds] = useState(initialSeconds || workMinutes * 60);
  
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: any;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s: number) => {
          const newSeconds = s - 1;
          // OPCIONAL: Guardar cada segundo puede ser pesado, 
          // pero podrías guardar el progreso aquí usando Diana's adapter
          return newSeconds;
        });
      }, 1000);
    } else if (seconds === 0) {
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);
      const nextMinutes = nextIsBreak ? breakMinutes : workMinutes;
      
      setSeconds(nextMinutes * 60);
      setIsActive(false);

      // Usamos el adaptador para guardar que el ciclo cambió
      localStorageAdapter.savePomodoro(nextMinutes);
      
      alert(nextIsBreak ? "¡Tiempo de descanso!" : "¡A trabajar!");
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, workMinutes, breakMinutes]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    const defaultTime = workMinutes * 60;
    setSeconds(defaultTime);
    localStorageAdapter.savePomodoro(workMinutes);
  };

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