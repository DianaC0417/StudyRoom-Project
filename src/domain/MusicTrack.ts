//domain/MusicTrack.ts
export type MusicMood = 'lofi' | 'focus' | 'rain' | 'cafe';

export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  imageUrl?: string;
  duration?: number;
};
