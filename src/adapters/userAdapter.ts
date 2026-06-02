// src/adapters/userAdapter.ts
import { type UserRepository } from '../aplication/ports/UserRepository';
import type { User } from '../domain/User';
import { apiClient, API_BASE_URL } from './apiClient';

const USER_KEY = 'studyroom_user';
const TOKEN_KEY = 'auth_token';

const getStorageForCurrentUser = (): Storage => {
  const localUser = localStorage.getItem(USER_KEY);
  const localToken = localStorage.getItem(TOKEN_KEY);

  if (localUser || localToken) {
    return localStorage;
  }

  return sessionStorage;
};

export const userAdapter: UserRepository = {
  save: (user: User): void => {
    const storage = user.remember ? localStorage : sessionStorage;

    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);

    storage.setItem(USER_KEY, JSON.stringify(user));

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

    const user: User = {
      id: data.id,
      email: data.email,
      username: data.user ?? data.username ?? email,
      token: data.token,
      remember,
    };

    userAdapter.save(user);

    return user;
  },

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
      remember,
    };

    userAdapter.save(user);

    return user;
  },

  updateUsername: async (username: string): Promise<User> => {
    const currentUser = userAdapter.get();

    if (!currentUser) {
      throw new Error('No hay un usuario autenticado');
    }

    const token =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    const url = `${API_BASE_URL}/auth/username`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const makeRequest = async (method: 'PATCH' | 'PUT') => {
      return fetch(url, {
        method,
        headers,
        body: JSON.stringify({ username }),
      });
    };

    let response = await makeRequest('PATCH');
    if (response.status === 404 || response.status === 405) {
      response = await makeRequest('PUT');
    }

    if (!response.ok) {
      const rawText = await response.text().catch(() => '');
      throw new Error(rawText || `Error en la petición (${response.status})`);
    }

    const data = await response.json();

    const updatedUser: User = {
      ...currentUser,
      id: data.id,
      email: data.email,
      username: data.user ?? data.username,
      token: data.token,
    };

    const storage = getStorageForCurrentUser();

    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);

    storage.setItem(USER_KEY, JSON.stringify(updatedUser));
    storage.setItem(TOKEN_KEY, updatedUser.token);

    return updatedUser;
  },
};
