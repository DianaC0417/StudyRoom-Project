// application/studyConfigService.ts
import {
  type StudyConfig,
  DEFAULT_CONFIG,
  validateStudyConfig,
} from '../domain/StudyConfig';
import type { StudyConfigRepository } from './ports/StudyConfigRepository';

export const createStudyConfigService = (configRepo: StudyConfigRepository) => {
  return {
    saveConfig: (config: StudyConfig): void => {
      if (!validateStudyConfig(config)) {
        throw new Error('Configuración inválida');
      }
      configRepo.save(config);
    },

    loadConfig: (): StudyConfig => {
      return configRepo.load() || DEFAULT_CONFIG;
    },

    clearConfig: (): void => {
      configRepo.clear();
    },
  };
};

export type StudyConfigService = ReturnType<typeof createStudyConfigService>;
