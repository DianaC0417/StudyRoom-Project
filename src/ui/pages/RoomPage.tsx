import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { StudyRoomScene } from '../../game/scenes/StudyRoomScene';
import { gameConfig } from '../../game/config';
import '../styles/RoomPage.css';

export const RoomPage: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current) return;

    // Configurar la escena
    const config = {
      ...gameConfig,
      scene: StudyRoomScene,
      parent: gameRef.current,
    };

    // Inicializar el juego
    phaserGameRef.current = new Phaser.Game(config);
    console.log('Juego iniciado');

    // Escuchar evento de colisión con el reloj
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

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="room-page">
      <div id="game-container" ref={gameRef} className="game-container"></div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¡Método Pomodoro!</h2>
            <p>{modalMessage}</p>
            <div className="pomodoro-placeholder">
              <p>Aquí irá el componente Pomodoro</p>
            </div>
            <button onClick={closeModal} className="close-modal-btn">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
