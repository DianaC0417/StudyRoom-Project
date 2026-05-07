import { useState } from 'react';
import { DEFAULT_CONFIG } from '../../domain/StudyConfig';
import type { StudyConfig, Character, Room } from '../../domain/StudyConfig';
import { useSound } from '../../ui/hooks/useSound';
import './CustomizationPage.css';

const PETS: { id: Character; label: string; img: string }[] = [
  { id: 'gatito', label: 'CAT', img: '/assets/personajes/gatito.png' },
  { id: 'ranita', label: 'FROG', img: '/assets/personajes/ranita.png' },
  { id: 'perrito', label: 'DOG', img: '/assets/personajes/perrito.png' },
];

const ROOMS: { id: Room; label: string; img: string }[] = [
  {
    id: 'salaestudio1',
    label: 'SALA 1',
    img: '/assets/salas/salaestudio1.png',
  },
  {
    id: 'salaestudio2',
    label: 'SALA 2',
    img: '/assets/salas/salaestudio2.png',
  },
  {
    id: 'salaestudio3',
    label: 'SALA 3',
    img: '/assets/salas/salaestudio3.png',
  },
];

interface CustomizationPageProps {
  onStart: (config: StudyConfig) => void;
}

const CustomizationPage = ({ onStart }: CustomizationPageProps) => {
  const [config, setConfig] = useState<StudyConfig>(DEFAULT_CONFIG);
  const playSelectPersonaje = useSound('/assets/sounds/select_personaje.mp3');
  const playSelectRoom = useSound('/assets/sounds/select_room.mp3');
  const playStart = useSound('/assets/sounds/start.mp3');

  const updateConfig = <K extends keyof StudyConfig>(
    key: K,
    value: StudyConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const selectedPet = PETS.find((p) => p.id === config.personaje);
  const selectedRoom = ROOMS.find((r) => r.id === config.sala);

  return (
    <div className="page">
      {/* TÍTULO con fondo negro */}
      <div className="title-bar">Personaliza tu experiencia</div>

      {/* Subtítulo sin fondo */}
      <h2 className="subtitle">BIENVENIDO ESTUDIANTE!</h2>

      {/* CONTENIDO */}
      <div className="content">
        {/* IZQUIERDA: Selectores */}
        <div className="left-col">
          <div className="section">
            <h3 className="section-title">1. ELIGE TU COMPAÑERO</h3>
            <div className="options">
              {PETS.map((pet) => (
                <button
                  key={pet.id}
                  className={`opt ${config.personaje === pet.id ? 'opt-on' : ''}`}
                  onClick={() => {
                    playSelectPersonaje();
                    updateConfig('personaje', pet.id);
                  }}
                >
                  <img src={pet.img} alt={pet.label} className="opt-img-pet" />
                  <span>{pet.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">2. ELIGE TU SALA</h3>
            <div className="options">
              {ROOMS.map((room) => (
                <button
                  key={room.id}
                  className={`opt ${config.sala === room.id ? 'opt-on' : ''}`}
                  onClick={() => {
                    playSelectRoom();
                    updateConfig('sala', room.id);
                  }}
                >
                  <img
                    src={room.img}
                    alt={room.label}
                    className="opt-img-room"
                  />
                  <span>{room.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DERECHA: Preview + Nombre + Botón */}
        <div className="right-col">
          <h3 className="preview-title">Vista Previa</h3>
          <div className="preview-box">
            <img src={selectedRoom?.img} alt="" className="preview-bg" />
            <img src={selectedPet?.img} alt="" className="preview-pet" />
            <span className="preview-name">
              {config.nombre.trim() || selectedPet?.label}
            </span>
          </div>

          <label className="name-label">TU NOMBRE:</label>
          <input
            type="text"
            placeholder="Nickname......"
            value={config.nombre}
            onChange={(e) => updateConfig('nombre', e.target.value)}
            className="name-input"
          />

          <button
            className="btn-go"
            onClick={() => {
              playStart();
              onStart(config);
            }}
          >
            EMPEZAR A ESTUDIAR!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;
