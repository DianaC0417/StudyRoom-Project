// Este es el "Puerto". Define qué acciones puede hacer el sistema.
export interface IPomodoroRepository {
  saveTargetTime(timestamp: number): void; // Guarda cuándo debe terminar el reloj
  getTargetTime(): number | null; // Recupera esa hora
  saveIsBreak(isBreak: boolean): void; // Guarda si está en descanso
  getIsBreak(): boolean; // Recupera si está en descanso
  saveSession(session: number): void; // Guarda el número de sesión actual
  getSession(): number; // Recupera el número de sesión actual
  clear(): void; // Limpia el registro de estado activo
}
