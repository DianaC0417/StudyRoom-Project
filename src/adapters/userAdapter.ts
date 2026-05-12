//src/adapters/userAdapter.ts
import { type UserRepository } from '../aplication/ports/UserRepository';
import type { User } from '../domain/User';
import { apiClient } from './apiClient';

const USER_KEY = 'studyroom_user';

export const userAdapter: UserRepository = {
  save: (user: User): void => {
    const storage = user.remember ? localStorage : sessionStorage;
    storage.setItem(USER_KEY, JSON.stringify(user));
  },

  get: (): User | null => {
    const local = localStorage.getItem(USER_KEY);
    if (local) return JSON.parse(local);

    const session = sessionStorage.getItem(USER_KEY);
    if (session) return JSON.parse(session);

    return null;
  },

  clear: (): void => {
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
  //esta es la función que se conectará al backend para hacer login
  login: async (username, password): Promise<User> => {
    try {
      // Hacemos el POST /login usando el apiClient hacia el backend
      const data = await apiClient('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      // El backend nos debería devolver los datos del usuario (User).
      return data;
    } catch (error) {
      console.error('Error al intentar iniciar sesión en el backend:', error);
      throw error;
    }
  },
};
