import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook para manejar música de fondo en bucle.
 * @param src - Ruta del archivo de audio
 * @returns Objeto con `play`, `pause`, `toggle` y el estado `isPlaying`.
 */
export const useBackgroundMusic = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; // Volumen

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      setIsPlaying(false);
    };
  }, [src]);

  const play = useCallback(() => {
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((prev) => {
      if (prev) {
        audioRef.current?.pause();
        return false;
      } else {
        audioRef.current?.play().catch(() => {});
        return true;
      }
    });
  }, []);

  return { play, pause, toggle, isPlaying };
};
