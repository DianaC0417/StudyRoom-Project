// src/ui/hooks/usePomodoro.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  pomodoroService,
  pomodoroSessionService,
  userService,
} from '../../config/dependencies';

interface PomodoroHook {
  timeDisplay: string;
  isActive: boolean;
  isBreak: boolean;
  currentSession: number;
  totalSessions: number;
  progress: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  skipToNext: () => void;
}

export const usePomodoro = (
  workMinutes: number = 25,
  breakMinutes: number = 5,
  longBreakMinutes: number = 15,
  sessionsUntilLongBreak: number = 4
): PomodoroHook => {
  const [seconds, setSeconds] = useState<number>(workMinutes * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [currentSession, setCurrentSession] = useState<number>(1);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const createOrResumeSession = useCallback(async () => {
    if (isBreak || activeSessionId) return;

    const currentUser = userService.getCurrentUser();
    if (!currentUser) return;

    try {
      const session = await pomodoroSessionService.startSession(
        currentUser.id,
        workMinutes
      );
      setActiveSessionId(session.id);
      localStorage.setItem('pomodoro_session_id', session.id);
    } catch (error) {
      console.error('Error al guardar sesión Pomodoro:', error);
    }
  }, [activeSessionId, isBreak, workMinutes]);

  const finalizeSession = useCallback(
    async (status: 'completed' | 'cancelled' | 'interrupted') => {
      if (!activeSessionId) return;

      try {
        if (status === 'completed') {
          await pomodoroSessionService.completeSession(activeSessionId);
        } else if (status === 'cancelled') {
          await pomodoroSessionService.cancelSession(activeSessionId);
        } else {
          await pomodoroSessionService.interruptSession(activeSessionId);
        }
      } catch (error) {
        console.error('Error al actualizar sesión Pomodoro:', error);
      } finally {
        setActiveSessionId(null);
        localStorage.removeItem('pomodoro_session_id');
      }
    },
    [activeSessionId]
  );

  // Calcular progreso (0-100)
  const progress = isBreak
    ? ((breakMinutes * 60 - seconds) / (breakMinutes * 60)) * 100
    : ((workMinutes * 60 - seconds) / (workMinutes * 60)) * 100;

  //
  const showNotification = useCallback(
    (message: string, type: 'work' | 'break' | 'complete') => {
      // Disparar evento personalizado para la UI
      window.dispatchEvent(
        new CustomEvent('pomodoroNotification', {
          detail: { message, type },
        })
      );

      // Log para debug
      console.log(`🔔 [Pomodoro] ${type}: ${message}`);
    },
    []
  );

  // 🔧 CORRECCIÓN 2: handleSessionComplete declarada ANTES de usarla en efectos
  const handleSessionComplete = useCallback(async () => {
    setIsActive(false);
    localStorage.removeItem('pomodoro_target');

    if (!isBreak) {
      await finalizeSession('completed');

      const nextBreak =
        currentSession % sessionsUntilLongBreak === 0
          ? longBreakMinutes
          : breakMinutes;

      setIsBreak(true);
      setSeconds(nextBreak * 60);

      // Notificación visual
      showNotification('✅ ¡Sesión completada! Toma un descanso', 'break');
    } else {
      // Descanso completado
      const nextSession = currentSession + 1;

      if (nextSession > sessionsUntilLongBreak) {
        // Ciclo completo, reiniciar
        setCurrentSession(1);
        showNotification(
          '🎉 ¡Ciclo completado! Comienza nuevo ciclo',
          'complete'
        );
      } else {
        setCurrentSession(nextSession);
        showNotification('📚 ¡Descanso terminado! A estudiar', 'work');
      }

      setIsBreak(false);
      setSeconds(workMinutes * 60);
    }

    // Guardar estado en localStorage
    const nextBreakType = !isBreak;
    const savedMinutes = nextBreakType
      ? currentSession % sessionsUntilLongBreak === 0
        ? longBreakMinutes
        : breakMinutes
      : workMinutes;
    pomodoroService.saveTime(savedMinutes);
  }, [
    isBreak,
    currentSession,
    workMinutes,
    breakMinutes,
    longBreakMinutes,
    sessionsUntilLongBreak,
    showNotification,
    finalizeSession,
  ]);

  // 🔧 CORRECCIÓN 3: Efecto para cargar estado persistente (sin setState sincrónico)
  useEffect(() => {
    const loadPersistedState = () => {
      const savedTarget = localStorage.getItem('pomodoro_target');
      const savedBreak = localStorage.getItem('pomodoro_is_break');
      const savedSession = localStorage.getItem('pomodoro_session');
      const savedSessionId = localStorage.getItem('pomodoro_session_id');

      if (savedTarget) {
        const targetTime = parseInt(savedTarget);
        const remaining = Math.round((targetTime - Date.now()) / 1000);

        if (remaining > 0) {
          // Usamos una función de actualización para evitar el warning
          setSeconds(remaining);
          setIsActive(true);
          if (savedBreak === 'true') setIsBreak(true);
          if (savedSession) setCurrentSession(parseInt(savedSession));
          if (savedSessionId) setActiveSessionId(savedSessionId);
        } else {
          localStorage.removeItem('pomodoro_target');
          localStorage.removeItem('pomodoro_session_id');
        }
      }
      setIsInitialized(true);
    };

    loadPersistedState();
  }, []); // Solo se ejecuta una vez al montar

  // 🔧 CORRECCIÓN 4: Motor del cronómetro (con dependencias correctas)
  useEffect(() => {
    if (!isInitialized) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            // Cuando llegue a 0, detenemos el intervalo y completamos la sesión
            if (interval) clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, isInitialized]);

  // 🔧 CORRECCIÓN 5: Efecto separado para manejar cuando seconds llega a 0
  useEffect(() => {
    if (!isInitialized) return;
    if (seconds <= 0 && isActive) {
      const timeoutId = setTimeout(() => {
        handleSessionComplete();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [seconds, isActive, isInitialized, handleSessionComplete]);

  // Funciones de control
  const toggleTimer = useCallback(() => {
    if (!isActive) {
      if (!isBreak) {
        void createOrResumeSession();
      }
      const targetTime = Date.now() + seconds * 1000;
      localStorage.setItem('pomodoro_target', targetTime.toString());
      localStorage.setItem('pomodoro_is_break', isBreak.toString());
      localStorage.setItem('pomodoro_session', currentSession.toString());
      setIsActive(true);
    } else {
      setIsActive(false);
      localStorage.removeItem('pomodoro_target');
    }
  }, [isActive, seconds, isBreak, currentSession, createOrResumeSession]);

  const resetTimer = useCallback(async () => {
    setIsActive(false);
    setIsBreak(false);
    setCurrentSession(1);
    setSeconds(workMinutes * 60);
    pomodoroService.saveTime(workMinutes);
    if (activeSessionId) {
      await finalizeSession('cancelled');
    }
    localStorage.removeItem('pomodoro_target');
    localStorage.removeItem('pomodoro_is_break');
    localStorage.removeItem('pomodoro_session');
  }, [workMinutes, activeSessionId, finalizeSession]);

  const skipToNext = useCallback(() => {
    setIsActive(false);
    handleSessionComplete();
  }, [handleSessionComplete]);

  const formatTime = (): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeDisplay: formatTime(),
    isActive,
    isBreak,
    currentSession,
    totalSessions: sessionsUntilLongBreak,
    progress: Math.min(100, Math.max(0, progress)),
    toggleTimer,
    resetTimer,
    skipToNext,
  };
};
