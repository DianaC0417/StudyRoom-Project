// src/ui/hooks/useBackgroundMusic.ts
import { useEffect, useRef, useState, useCallback } from 'react';

export const useBackgroundMusic = (src: string, autoPlay: boolean = false) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isMutedByRadioRef = useRef(false);

  const safePlay = useCallback((audio: HTMLAudioElement) => {
    // Si la radio está activa, bloqueamos que el ambiente se reproduzca solo
    if (isMutedByRadioRef.current) return;

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
              'useBackgroundMusic: Esperando interacción del usuario (política de autoplay).'
            );
          } else if (err.name === 'AbortError') {
            // Ignorar AbortError
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

    // --- ESCUCHADOR DE LA RADIO ---
    const handleRadioStatus = (e: Event) => {
      const customEvent = e as CustomEvent<{ isRadioPlaying: boolean }>;
      if (audioRef.current) {
        if (customEvent.detail.isRadioPlaying) {
          isMutedByRadioRef.current = true;
          safePause(audioRef.current);
        } else {
          isMutedByRadioRef.current = false;
          // Al apagar la radio, si venía en autoplay, reactivamos el ambiente
          if (autoPlay) safePlay(audioRef.current);
        }
      }
    };

    window.addEventListener('sync_radio_status', handleRadioStatus);

    return () => {
      if (handleInteraction) {
        window.removeEventListener('click', handleInteraction);
      }
      window.removeEventListener('sync_radio_status', handleRadioStatus);
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

  return { play, pause, toggle, isPlaying };
};