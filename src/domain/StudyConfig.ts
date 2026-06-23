// domain/StudyConfig.ts
export type Character = 'gatito' | 'ranita' | 'perrito';
export type Room = 'salaestudio1' | 'salaestudio2' | 'salaestudio3';

export interface StudyConfig {
  nombre: string;
  personaje: Character;
  sala: Room;
}

export const DEFAULT_CONFIG: StudyConfig = {
  nombre: 'Estudiante',
  personaje: 'gatito',
  sala: 'salaestudio1',
};

export const validateStudyConfig = (config: StudyConfig): boolean => {
  return (
    config.nombre.trim().length > 0 &&
    ['gatito', 'ranita', 'perrito'].includes(config.personaje) &&
    ['salaestudio1', 'salaestudio2', 'salaestudio3'].includes(config.sala)
  );
};
