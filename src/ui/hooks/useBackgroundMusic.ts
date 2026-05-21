<<<<<<< HEAD
import { useEffect, useRef, useState, useCallback } from 'react';
=======
import { useEffect, useRef, useState } from 'react';
>>>>>>> origin/main

/**
 * Hook para manejar música de fondo en bucle.
 * @param src - Ruta del archivo de audio
<<<<<<< HEAD
 * @param autoPlay - Si es true, inicia la reproducción automáticamente y maneja la interacción del usuario si está bloqueada.
 * @returns Objeto con `play`, `pause`, `toggle` y el estado `isPlaying`.
 */
export const useBackgroundMusic = (src: string, autoPlay: boolean = false) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const safePlay = useCallback((audio: HTMLAudioElement) => {
    const promise = audio.play();
    playPromiseRef.current = promise;

    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          if (err.name === 'NotAllowedError') {
            console.log(
              'useBackgroundMusic: Esperando interacción del usuario para reproducir audio (política de autoplay).'
            );
          } else if (err.name === 'AbortError') {
            // Ignorar AbortError, es normal si se pausó antes de que empezara
          } else {
            console.error('useBackgroundMusic: Error de reproducción:', err);
          }
        });
    }
  }, []);

  const safePause = useCallback((audio: HTMLAudioElement) => {
    if (
      playPromiseRef.current !== undefined &&
      playPromiseRef.current !== null
    ) {
      playPromiseRef.current
        .then(() => {
          audio.pause();
          setIsPlaying(false);
        })
        .catch(() => {
          // Ignorar errores del play abortado
          audio.pause();
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 1.0;
    audioRef.current = audio;

    let handleInteraction: (() => void) | null = null;

    if (autoPlay) {
      safePlay(audio);

      handleInteraction = () => {
        safePlay(audio);
        if (handleInteraction) {
          window.removeEventListener('click', handleInteraction);
        }
      };
      window.addEventListener('click', handleInteraction);
    }

    return () => {
      if (handleInteraction) {
        window.removeEventListener('click', handleInteraction);
      }
      safePause(audio);
      audioRef.current = null;
    };
  }, [src, autoPlay, safePlay, safePause]);

  const play = useCallback(() => {
    if (audioRef.current) safePlay(audioRef.current);
  }, [safePlay]);

  const pause = useCallback(() => {
    if (audioRef.current) safePause(audioRef.current);
  }, [safePause]);

  const toggle = useCallback(() => {
    setIsPlaying((prev) => {
      if (prev) {
        if (audioRef.current) safePause(audioRef.current);
        return false;
      } else {
        if (audioRef.current) safePlay(audioRef.current);
        return true;
      }
    });
  }, [safePlay, safePause]);
=======
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

  const play = () => {
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) pause();
    else play();
  };
>>>>>>> origin/main

  return { play, pause, toggle, isPlaying };
};
