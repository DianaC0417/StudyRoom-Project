import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { StudyRoomScene } from '../../game/scenes/StudyRoomScene';
import { gameConfig } from '../../game/config';
import { usePomodoro } from '../hooks/usePomodoro'; // 1. Importamos el hook
import '../styles/RoomPage.css';

export const RoomPage: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 2. Usamos el Hook de Pomodoro
  // Configuramos 25 min de estudio y 5 de descanso
  const { timeDisplay, isActive, isBreak, toggleTimer, resetTimer } =
    usePomodoro(25, 5);

  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current) return;

    const config = {
      ...gameConfig,
      scene: StudyRoomScene,
      parent: gameRef.current,
    };

    phaserGameRef.current = new Phaser.Game(config);

    const handleOpenPomodoro = (event: CustomEvent) => {
      setModalMessage(event.detail.message);
      setShowModal(true);
    };

    window.addEventListener(
      'openPomodoro',
      handleOpenPomodoro as EventListener
    );

    return () => {
      window.removeEventListener(
        'openPomodoro',
        handleOpenPomodoro as EventListener
      );
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  const closeModal = () => setShowModal(false);

  return (
    <div className="room-page">
      <div id="game-container" ref={gameRef} className="game-container"></div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* 3. Título dinámico: cambia si es descanso o trabajo */}
            <h2 style={{ color: isBreak ? '#b6c2ff' : '#664599' }}>
              {isBreak ? '☕ ¡Tiempo de Descanso!' : '📖 ¡Sesión de Estudio!'}
            </h2>
            <p>{modalMessage}</p>

            {/* 4. Visualización del Cronómetro Real */}
            <div className="pomodoro-timer-container">
              <span
                className="timer-digits"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}
              >
                {timeDisplay}
              </span>
            </div>

            {/* 5. Controles del Pomodoro */}
            <div
              className="timer-controls"
              style={{
                marginTop: '20px',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
              }}
            >
              <button onClick={toggleTimer} className="control-btn">
                {isActive ? 'Pausar' : 'Empezar'}
              </button>
              <button onClick={resetTimer} className="control-btn secondary">
                Reiniciar
              </button>
            </div>
            <button
              onClick={closeModal}
              className="close-modal-btn"
              style={{ marginTop: '30px' }}
            >
              Volver a la sala
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
