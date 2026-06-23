// src/application/statsService.ts
import { apiClient } from '../adapters/apiClient';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface PomodoroSession {
  id: string;
  startTime: string;
  status: 'completed' | 'cancelled';
}

const getUserId = (): string => {
  const token =
    localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  if (!token) throw new Error('No hay token de autenticación');

  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    // Dependiendo del backend, el ID del usuario puede estar en 'sub', 'userId' o 'id'
    const userId = decoded.sub || decoded.userId || decoded.id;
    if (!userId) throw new Error('Token no contiene userId');
    console.log('✅ userId extraído del token:', userId);
    return userId;
  } catch (err) {
    console.error('❌ Error decodificando token:', err);
    throw new Error('Token inválido o no contiene userId');
  }
};

export const fetchTasks = async (): Promise<Task[]> => {
  const userId = getUserId();
  console.log('🔍 Pidiendo tareas para userId:', userId);
  return apiClient(`/tasks/user/${userId}`);
};

export const fetchPomodoroSessions = async (): Promise<PomodoroSession[]> => {
  const userId = getUserId();
  console.log('🔍 Pidiendo sesiones para userId:', userId);
  return apiClient(`/pomodoro/user/${userId}`);
};
