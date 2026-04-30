// domain/User.ts - SIN importaciones externas
export interface User {
  username: string;
  remember: boolean;
}

export const validateUsername = (username: string): boolean => {
  return username.trim().length > 0 && username.trim().length <= 20;
};
