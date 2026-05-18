// src/adapters/apiClient.ts

export const API_BASE_URL = 'http://localhost:3000/api';

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  // 1. Intentamos recuperar el token que guardamos al hacer login
  const token = localStorage.getItem('auth_token');
  //Preparamos los headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // 3. Si el token existe, lo añadimos siguiendo el estándar "Bearer"
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers, // Usamos los headers que ya incluyen el token
  });

  if (!response.ok) {
    // Si el servidor responde 401 (No autorizado), podrías incluso limpiar el token
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en la petición API');
  }

  return response.json();
};
