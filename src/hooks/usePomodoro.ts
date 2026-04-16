import { useState, useEffect } from 'react';

export const usePomodoro = (workMinutes: number = 25, breakMinutes: number = 5) => {
  const [seconds, setSeconds] = useState(workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: any;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      // Cambio automático: de trabajo a descanso o viceversa
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);
      setSeconds(nextIsBreak ? breakMinutes * 60 : workMinutes * 60);
      setIsActive(false); // Pausa al terminar para que el usuario inicie el siguiente bloque
      alert(nextIsBreak ? "¡Tiempo de descanso!" : "¡A trabajar!");
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, workMinutes, breakMinutes]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(workMinutes * 60);
  };

  // Formato MM:SS
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