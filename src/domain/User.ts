// domain/User.ts - SIN importaciones externas
export interface User {
  id: string;
  email: string;
  username: string;
  token: string; // ← JWT del backend
  remember: boolean;
}

export const validateUsername = (username: string): boolean => {
  return username.trim().length > 0 && username.trim().length <= 20;
};
