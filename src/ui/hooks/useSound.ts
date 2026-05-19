import { useCallback } from 'react';
import { audioAdapter } from '../../adapters/audioAdapter';

/**
 * Hook para reproducir un efecto de sonido una vez.
 * Consumiendo el adapter centralizado para reutilizar instancias.
 * @param src - Ruta del archivo de audio
 * @returns Función `play` para disparar el sonido.
 */
export const useSound = (src: string) => {
  const play = useCallback(() => {
    audioAdapter.playSoundEffect(src);
  }, [src]);

  return play;
};
