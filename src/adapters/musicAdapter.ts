//src/adapters/musicAdapter.ts
import type { MusicRepository } from '../application/ports/MusicRepository';
import type { MusicMood, MusicTrack } from '../domain/MusicTrack';

type ApiMusicResponse = {
  success: boolean;
  data: MusicTrack[];
  message?: string;
};

const API_URL = 'http://localhost:3000/api';

export const musicAdapter: MusicRepository = {
  async getTracksByMood(mood: MusicMood): Promise<MusicTrack[]> {
    const response = await fetch(`${API_URL}/music/mood/${mood}`);

    if (!response.ok) {
      throw new Error('No se pudo cargar la música.');
    }

    const result = (await response.json()) as ApiMusicResponse;
    return result.data;
  },
};
