import { useCallback, useRef } from 'react';

/**
 * Hook para reproducir un efecto de sonido una vez.
 * @param src - Ruta del archivo de audio
 * @returns Función `play` para disparar el sonido.
 */
export const useSound = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // El navegador puede bloquear reproducción sin interacción previa.
      // No es un error crítico.
    });
  }, [src]);

  return play;
};
