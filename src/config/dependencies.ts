// config/dependencies.ts
// Punto ÚNICO donde se inyectan los adapters concretos a los servicios

import { userAdapter } from '../adapters/userAdapter';
import { studyConfigAdapter } from '../adapters/studyConfigAdapter';
import { pomodoroAdapter } from '../adapters/pomodoroAdapter';
import { pomodoroSessionAdapter } from '../adapters/pomodoroSessionAdapter';

import { createUserService } from '../aplication/userService';
import { createStudyConfigService } from '../aplication/studyConfigService';
import { createPomodoroService } from '../aplication/pomodoroService';
import { createPomodoroSessionService } from '../aplication/pomodoroSessionService';

// 1. Crear servicios inyectando sus dependencias (adapters)
export const userService = createUserService(userAdapter);
export const studyConfigService = createStudyConfigService(studyConfigAdapter);
export const pomodoroService = createPomodoroService(pomodoroAdapter);
export const pomodoroSessionService = createPomodoroSessionService(
  pomodoroSessionAdapter
);

// 2. (Opcional) Exportar tipos si los necesitas en React
export type { UserService } from '../aplication/userService';
export type { StudyConfigService } from '../aplication/studyConfigService';
export type { PomodoroService } from '../aplication/pomodoroService';
export type { PomodoroSessionService } from '../aplication/pomodoroSessionService';
