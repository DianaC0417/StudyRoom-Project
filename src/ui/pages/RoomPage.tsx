// ui/pages/RoomPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { StudyRoomScene } from '../../game/scenes/StudyRoomScene';
import { gameConfig } from '../../game/config';
import { usePomodoro } from '../hooks/usePomodoro';
import { PomodoroModal } from '../components/PomodoroModal';
import { useNavigate, useLocation } from 'react-router-dom'; // ← useLocation
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { useSound } from '../hooks/useSound';
import type { Room, StudyConfig } from '../../domain/StudyConfig';
import '../styles/RoomPage.css';

export const RoomPage: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // ← obtenemos el estado de navegación
  const [showExitBtn, setShowExitBtn] = useState(false);

  // Configuración desde el estado de navegación (sin localStorage)
  const config = location.state as StudyConfig | undefined;

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

  const musicMap: Record<Room, string> = {
    salaestudio1: '/sounds/music/sala1.mp3',
    salaestudio2: '/sounds/music/sala2.mp3',
    salaestudio3: '/sounds/music/sala3.mp3',
  };
  const musicSrc = config?.sala ? musicMap[config.sala] : null;
  const { play: playMusic, pause: pauseMusic } = useBackgroundMusic(
    musicSrc || '/sounds/music/sala1.mp3'
  );

  useEffect(() => {
    if (musicSrc) {
      playMusic();
    }
    return () => pauseMusic();
  }, [musicSrc, playMusic, pauseMusic]);

  const playPomodoroOpen = useSound('/sounds/ui/pomodoro_open.mp3');

  const playClick = useSound('/sounds/ui/click.mp3');
  const playClose = useSound('/sounds/ui/close.mp3');

  const handleToggle = () => {
    playClick();
    toggleTimer();
  };
  const handleReset = () => {
    playClick();
    resetTimer();
  };
  const handleSkip = () => {
    playClick();
    skipToNext();
  };
  const handleCloseModal = () => {
    playClose();
    setShowModal(false);
  };

  const handleExit = () => {
    playClose();
    navigate('/customization');
  };

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
      playPomodoroOpen();
    };

    const handleNotification = (event: CustomEvent) => {
      console.log('Notificación:', event.detail);
    };

    const handleExitPrompt = (event: CustomEvent<{ show: boolean }>) => {
      setShowExitBtn(event.detail.show);
    };

    window.addEventListener(
      'openPomodoro',
      handleOpenPomodoro as EventListener
    );
    window.addEventListener(
      'pomodoroNotification',
      handleNotification as EventListener
    );
    window.addEventListener('nearExit', handleExitPrompt as EventListener);

    return () => {
      window.removeEventListener('nearExit', handleExitPrompt as EventListener);
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
  }, [navigate, playPomodoroOpen]);

  return (
    <div className="room-page">
      <div id="game-container" ref={gameRef} className="game-container"></div>

      {showExitBtn && (
        <button onClick={handleExit} className="exit-button-pixel">
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
        onToggle={handleToggle}
        onReset={handleReset}
        onSkip={handleSkip}
        onClose={handleCloseModal}
      />
    </div>
  );
};
