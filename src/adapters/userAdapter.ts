import { type UserRepository } from '../application/ports/UserRepository';
import type { User } from '../domain/User';
import { apiClient } from './apiClient';

const USER_KEY = 'studyroom_user';
const TOKEN_KEY = 'auth_token';

export const userAdapter: UserRepository = {
  save: (user: User): void => {
    const storage = user.remember ? localStorage : sessionStorage;
    storage.setItem(USER_KEY, JSON.stringify(user));
    // Si el usuario tiene token, también lo guardamos
    if (user.token) {
      storage.setItem(TOKEN_KEY, user.token);
    }
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
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },

  // 🆕 REGISTRO
  register: async (
    username: string,
    email: string,
    password: string,
    remember = false
  ): Promise<User> => {
    const data = await apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });

    // data debe contener: { id, email, user|username, token }
    const user: User = {
      id: data.id,
      email: data.email,
      username: data.user ?? data.username ?? email,
      token: data.token,
      remember: remember,
    };
    // Guardar automáticamente
    userAdapter.save(user);
    return user;
  },

  // 🔐 LOGIN (mejorado)
  login: async (
    email: string,
    password: string,
    remember = false
  ): Promise<User> => {
    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const user: User = {
      id: data.id,
      email: data.email,
      username: data.user ?? data.username ?? data.email,
      token: data.token,
      remember: remember,
    };
    userAdapter.save(user);
    return user;
  },
};
