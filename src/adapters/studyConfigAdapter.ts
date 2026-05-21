// adapters/studyConfigAdapter.ts
<<<<<<< HEAD
=======
// adapters/studyConfigAdapter.ts
>>>>>>> origin/main
import type { StudyConfigRepository } from '../aplication/ports/StudyConfigRepository';
import type { StudyConfig } from '../domain/StudyConfig';

const CONFIG_KEY = 'user_study_config';

export const studyConfigAdapter: StudyConfigRepository = {
  save: (config: StudyConfig): void => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  },

  load: (): StudyConfig | null => {
    const data = localStorage.getItem(CONFIG_KEY);
    if (!data) return null;

    try {
      return JSON.parse(data) as StudyConfig;
    } catch {
      return null;
    }
  },

  clear: (): void => {
    localStorage.removeItem(CONFIG_KEY);
  },
};
