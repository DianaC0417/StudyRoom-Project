// config/dependencies.ts
// Punto ÚNICO donde se inyectan los adapters concretos a los servicios

import { userAdapter } from '../adapters/userAdapter';
import { studyConfigAdapter } from '../adapters/studyConfigAdapter';
import { pomodoroAdapter } from '../adapters/pomodoroAdapter';
import { LocalStoragePomodoroAdapter } from '../adapters/localStorageAdapter';
import { todoAdapter } from '../adapters/todoAdapter';
import { musicAdapter } from '../adapters/musicAdapter';

import { createUserService } from '../application/userService';
import { createStudyConfigService } from '../application/studyConfigService';
import { createPomodoroService } from '../application/pomodoroService';
import { createTodoService } from '../application/todoService';
import { createMusicService } from '../application/musicService';

// Instanciar el adaptador de estado del Pomodoro
const pomodoroStateAdapter = new LocalStoragePomodoroAdapter();

// 1. Crear servicios inyectando sus dependencias (adapters)
export const userService = createUserService(userAdapter);
export const studyConfigService = createStudyConfigService(studyConfigAdapter);
export const pomodoroService = createPomodoroService(pomodoroAdapter, pomodoroStateAdapter);
export const todoService = createTodoService(todoAdapter);
export const musicService = createMusicService(musicAdapter);

// 2. Exportar tipos si los necesitas en React
export type { UserService } from '../application/userService';
export type { StudyConfigService } from '../application/studyConfigService';
export type { PomodoroService } from '../application/pomodoroService';
export type { TodoService } from '../application/todoService';
export type { MusicService } from '../application/musicService';
