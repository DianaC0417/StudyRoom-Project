// application/ports/StudyConfigRepository.ts
// application/ports/StudyConfigRepository.ts
import type { StudyConfig } from '../../domain/StudyConfig';

export interface StudyConfigRepository {
  save(config: StudyConfig): void;
  load(): StudyConfig | null;
  clear(): void;
}
