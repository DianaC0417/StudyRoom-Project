const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('Falta configurar VITE_API_URL');
}

export const API_BASE_URL = `${API_URL}/api`;

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  // 1. Intentamos recuperar el token que guardamos al hacer login
  const token =
    localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  // 2. Preparamos los headers
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
    headers,
  });

  if (!response.ok) {
    // Si el servidor responde 401 (No autorizado), limpiamos el token
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
    }

    const rawText = await response.text().catch(() => '');
    let errorMessage = `Error en la petición API (${response.status})`;

    try {
      const errorData = rawText ? JSON.parse(rawText) : null;
      // Agregamos la validación para "error" que es la nueva estructura hexagonal
      if (errorData?.error) {
        errorMessage = errorData.error;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (rawText) {
        errorMessage = rawText;
      }
    } catch {
      if (rawText) {
        errorMessage = rawText;
      }
    }

    throw new Error(errorMessage);
  }

  return response.json();
};