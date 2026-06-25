// src/ui/hooks/useMusic.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MusicMood, MusicTrack } from '../../domain/MusicTrack';
import { createMusicService } from '../../aplication/musicService';
import { musicAdapter } from '../../adapters/musicAdapter';

const musicService = createMusicService(musicAdapter);

export function useMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef(0.5);

  const [mood, setMood] = useState<MusicMood>('lofi');
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [error, setError] = useState('');

  // Función interna para avisarle al ambiente qué está haciendo la radio
  const dispatchRadioStatus = (playing: boolean) => {
    const event = new CustomEvent('sync_radio_status', {
      detail: { isRadioPlaying: playing },
    });
    window.dispatchEvent(event);
  };

  const loadMoodTracks = useCallback(async (selectedMood: MusicMood) => {
    setIsLoading(true);
    setError('');
    setMood(selectedMood);
    setIsPlaying(false);
    dispatchRadioStatus(false); // Detiene estado de radio activa al cambiar de vibra

    try {
      const result = await musicService.getTracksByMood(selectedMood);

      setTracks(result);
      setSelectedTrack(result[0] || null);

      if (audioRef.current && result[0]) {
        audioRef.current.pause();
        audioRef.current.src = result[0].audioUrl;
        audioRef.current.volume = volumeRef.current;
      }
    } catch {
      setError('No se pudo cargar la música de esta vibra.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectTrack = useCallback((track: MusicTrack) => {
    setSelectedTrack(track);
    setIsPlaying(false);
    dispatchRadioStatus(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = track.audioUrl;
      audioRef.current.volume = volumeRef.current;
    }
  }, []);

  const playNextTrack = useCallback(() => {
    setTracks((currentTracks) => {
      setSelectedTrack((currentTrack) => {
        if (!currentTrack || currentTracks.length === 0) return currentTrack;

        const currentIndex = currentTracks.findIndex(
          (track) => track.id === currentTrack.id
        );

        const nextIndex =
          currentIndex === currentTracks.length - 1 ? 0 : currentIndex + 1;

        const nextTrack = currentTracks[nextIndex];

        if (audioRef.current && nextTrack) {
          audioRef.current.pause();
          audioRef.current.src = nextTrack.audioUrl;
          audioRef.current.volume = volumeRef.current;
          
          // Si ya estaba sonando, forzamos que siga reproduciendo la siguiente pista
          if (isPlaying) {
            audioRef.current.play()
              .then(() => dispatchRadioStatus(true))
              .catch(() => {
                setIsPlaying(false);
                dispatchRadioStatus(false);
              });
          }
        }

        return nextTrack || currentTrack;
      });

      return currentTracks;
    });
  }, [isPlaying]);

  const togglePlay = useCallback(async () => {
    if (!selectedTrack || !audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        dispatchRadioStatus(false); // Avisamos al ambiente para que regrese
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        dispatchRadioStatus(true); // Apagamos el ambiente
      }
    } catch {
      setError('No se pudo reproducir la música.');
    }
  }, [selectedTrack, isPlaying]);

  const changeVolume = useCallback((value: number) => {
    setVolume(value);
    volumeRef.current = value;

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volumeRef.current;
    audioRef.current = audio;

    return () => {
      audio.pause();
      dispatchRadioStatus(false); // Al desmontar la radio, liberamos el ambiente de fondo
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const initialize = async () => {
      await loadMoodTracks('lofi');
    };
    void initialize();
  }, [loadMoodTracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('ended', playNextTrack);
    return () => {
      audio.removeEventListener('ended', playNextTrack);
    };
  }, [playNextTrack]);

  return {
    mood,
    tracks,
    selectedTrack,
    isPlaying,
    isLoading,
    volume,
    error,
    loadMoodTracks,
    selectTrack,
    togglePlay,
    changeVolume,
    playNextTrack,
  };
}