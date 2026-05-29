//application/musicService.ts
import type { MusicRepository } from './ports/MusicRepository';
import type { MusicMood, MusicTrack } from '../domain/MusicTrack';

export function createMusicService(repository: MusicRepository) {
  return {
    async getTracksByMood(mood: MusicMood): Promise<MusicTrack[]> {
      return repository.getTracksByMood(mood);
    },
  };
}

export type MusicService = ReturnType<typeof createMusicService>;
