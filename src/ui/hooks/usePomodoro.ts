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