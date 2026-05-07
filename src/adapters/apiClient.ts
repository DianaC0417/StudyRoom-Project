// src/adapters/apiClient.ts

// URL dummy
export const API_BASE_URL = 'http://localhost:3000';

// Esta función se encargará de hacer las peticiones al backend y manejar errores comunes
export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en la petición API');
  }

  return response.json();
};
