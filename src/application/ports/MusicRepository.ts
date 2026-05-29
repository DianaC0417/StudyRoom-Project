//application/ports/MusicRepository.ts
import type { MusicMood, MusicTrack } from '../../domain/MusicTrack';

export interface MusicRepository {
  getTracksByMood(mood: MusicMood): Promise<MusicTrack[]>;
}
