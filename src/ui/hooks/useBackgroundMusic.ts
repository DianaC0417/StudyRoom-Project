import { useEffect, useState } from 'react';
import { audioAdapter } from '../../adapters/audioAdapter';

/**
 * Hook para manejar música de fondo en bucle.
 * Consumiendo el adapter centralizado para evitar duplicación.
 * @param src - Ruta del archivo de audio
 * @returns Objeto con `play`, `pause`, `toggle` y el estado `isPlaying`.
 */
export const useBackgroundMusic = (src: string) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Sincronizar el estado local con el estado real del audio (por si cambió en otra vista)
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audioAdapter.bgAudio.addEventListener('play', handlePlay);
    audioAdapter.bgAudio.addEventListener('pause', handlePause);

    setIsPlaying(audioAdapter.isPlayingBackgroundMusic());

    return () => {
      audioAdapter.bgAudio.removeEventListener('play', handlePlay);
      audioAdapter.bgAudio.removeEventListener('pause', handlePause);
    };
  }, []);

  const play = () => {
    audioAdapter.playBackgroundMusic(src);
  };

  const pause = () => {
    audioAdapter.pauseBackgroundMusic();
  };

  const toggle = () => {
    const isNowPlaying = audioAdapter.toggleBackgroundMusic(src);
    setIsPlaying(isNowPlaying);
  };

  return { play, pause, toggle, isPlaying };
};
