// Este es el "Puerto". Define qué acciones puede hacer el sistema.
export interface IPomodoroRepository {
  saveTargetTime(timestamp: number): void; // Guarda cuándo debe terminar el reloj
  getTargetTime(): number | null; // Recupera esa hora
  clear(): void; // Limpia el registro
}
