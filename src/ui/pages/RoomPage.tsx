// ui/pages/RoomPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { StudyRoomScene } from '../../game/scenes/StudyRoomScene';
import { gameConfig } from '../../game/config';
import { usePomodoro } from '../hooks/usePomodoro';
import { PomodoroModal } from '../components/PomodoroModal';

import { useNavigate } from 'react-router-dom'; // + Importar navegación

import '../styles/RoomPage.css';

export const RoomPage: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const navigate = useNavigate(); // + Hook para salir
  const [showExitBtn, setShowExitBtn] = useState(false); // + Estado del botón
  
  const {
    timeDisplay,
    isActive,
    isBreak,
    currentSession,
    totalSessions,
    progress,
    toggleTimer,
    resetTimer,
    skipToNext,
  } = usePomodoro(25, 5, 15, 4);

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

    const handleNotification = (event: CustomEvent) => {
      // Puedes mostrar notificaciones visuales adicionales aquí
      console.log('Notificación:', event.detail);
    };

    const handleExitPrompt = (event: any) => {
      setShowExitBtn(event.detail.show);
    };//+++

    window.addEventListener(
      'openPomodoro',
      handleOpenPomodoro as EventListener
    );
    window.addEventListener(
      'pomodoroNotification',
      handleNotification as EventListener
    );

    window.addEventListener(
      'nearExit',
       handleExitPrompt as EventListener
    );//+++

    return () => {

      window.removeEventListener(
        'nearExit', 
        handleExitPrompt as EventListener
      );//+++

      window.removeEventListener(
        'openPomodoro',
        handleOpenPomodoro as EventListener
      );
      window.removeEventListener(
        'pomodoroNotification',
        handleNotification as EventListener
      );
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [navigate]);

  const closeModal = () => setShowModal(false);

  return (
    <div className="room-page">
      <div id="game-container" ref={gameRef} className="game-container"></div>

      {/* BOTÓN DE SALIDA PIXELADO (Sin assets nuevos) */}
      {showExitBtn && (
  <button 
    onClick={() => navigate('/customization')}
    className="exit-button-pixel"
  >
    <span className="exit-icon"></span>
    <span>SALIR</span>
  </button>
)}

      <PomodoroModal
        show={showModal}
        message={modalMessage}
        timeDisplay={timeDisplay}
        isActive={isActive}
        isBreak={isBreak}
        currentSession={currentSession}
        totalSessions={totalSessions}
        progress={progress}
        onToggle={toggleTimer}
        onReset={resetTimer}
        onSkip={skipToNext}
        onClose={closeModal}
      />
    </div>
  );
};
