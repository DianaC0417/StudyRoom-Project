// config/dependencies.ts
// Punto ÚNICO donde se inyectan los adapters concretos a los servicios

import { userAdapter } from '../adapters/userAdapter';
import { studyConfigAdapter } from '../adapters/studyConfigAdapter';
import { pomodoroAdapter } from '../adapters/pomodoroAdapter';

import { createUserService } from '../aplication/userService';
import { createStudyConfigService } from '../aplication/studyConfigService';
import { createPomodoroService } from '../aplication/pomodoroService';

// 1. Crear servicios inyectando sus dependencias (adapters)
export const userService = createUserService(userAdapter);
export const studyConfigService = createStudyConfigService(studyConfigAdapter);
export const pomodoroService = createPomodoroService(pomodoroAdapter);

// 2. (Opcional) Exportar tipos si los necesitas en React
export type { UserService } from '../aplication/userService';
export type { StudyConfigService } from '../aplication/studyConfigService';
export type { PomodoroService } from '../aplication/pomodoroService';
