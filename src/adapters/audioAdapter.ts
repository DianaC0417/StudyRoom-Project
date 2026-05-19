// src/adapters/audioAdapter.ts

export const audioAdapter = (() => {
  // Singleton para la música de fondo
  const bgAudio = new Audio();
  bgAudio.loop = true;
  bgAudio.volume = 0.2;

  // Mapa de sonidos para reutilizar instancias y no crear nuevas en cada clic
  const soundEffects: Record<string, HTMLAudioElement> = {};

  const playBackgroundMusic = (src: string) => {
    // Si ya está sonando esta misma pista, no hacemos nada para evitar que se reinicie
    if (!bgAudio.paused && bgAudio.src.endsWith(src)) {
      return;
    }

    // Si cambió la ruta o estaba pausado, actualizamos la fuente
    if (!bgAudio.src.endsWith(src)) {
      bgAudio.src = src;
    }

    bgAudio.play().catch((error) => {
      console.warn("Autoplay bloqueado. Esperando interacción...", error);
      // Intentar de nuevo con el primer clic del usuario en caso de bloqueo
      const playOnInteract = () => {
        bgAudio.play().catch(() => {});
        document.removeEventListener('click', playOnInteract);
      };
      document.addEventListener('click', playOnInteract);
    });
  };

  const pauseBackgroundMusic = () => {
    bgAudio.pause();
  };

  const toggleBackgroundMusic = (src: string): boolean => {
    if (bgAudio.paused) {
      playBackgroundMusic(src);
      return true;
    } else {
      pauseBackgroundMusic();
      return false;
    }
  };

  const isPlayingBackgroundMusic = (): boolean => {
    return !bgAudio.paused;
  };

  const playSoundEffect = (src: string) => {
    if (!soundEffects[src]) {
      soundEffects[src] = new Audio(src);
    }
    const sfx = soundEffects[src];
    sfx.currentTime = 0; // Reiniciar por si se hace clic muy rápido
    sfx.play().catch(() => {
      // El navegador puede bloquear reproducción sin interacción previa.
    });
  };

  return {
    playBackgroundMusic,
    pauseBackgroundMusic,
    toggleBackgroundMusic,
    isPlayingBackgroundMusic,
    playSoundEffect,
    bgAudio,
  };
})();
