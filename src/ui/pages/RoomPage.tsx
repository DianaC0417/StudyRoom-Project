// ui/pages/RoomPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { StudyRoomScene } from '../../game/scenes/StudyRoomScene';
import { gameConfig } from '../../game/config';
import { usePomodoro } from '../hooks/usePomodoro';
import { PomodoroModal } from '../components/PomodoroModal';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [showExitBtn, setShowExitBtn] = useState(false);

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

  // Música de fondo por sala
  const musicMap: Record<Room, string> = {
    salaestudio1: 'assets/sounds/sala1.mp3',
    salaestudio2: 'assets/sounds/sala2.mp3',
    salaestudio3: 'assets/sounds/sala3.mp3',
  };
  const musicSrc = config?.sala ? musicMap[config.sala] : null;
  const { play: playMusic, pause: pauseMusic } = useBackgroundMusic(
    musicSrc || 'assets/sounds/sala1.mp3'
  );

  useEffect(() => {
    if (musicSrc) {
      playMusic();
    }
    return () => pauseMusic();
  }, [musicSrc, playMusic, pauseMusic]);

  // Sonidos
  const playPomodoroOpen = useSound('assets/sounds/inputclick.mp3');
  const playClick = useSound('assets/sounds/select_personaje.mp3');
  const playExit = useSound('assets/sounds/close.mp3');

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
    playClick();
    setShowModal(false);
  };

  const handleExit = () => {
    playExit();
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

    const handleOpenPomodoro = (event: Event) => {
      const customEvent = event as CustomEvent;
      setModalMessage(customEvent.detail.message);
      setShowModal(true);
      playPomodoroOpen();
    };

    const handleNotification = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Notificación:', customEvent.detail);
    };

    const handleExitPrompt = (event: Event) => {
      const customEvent = event as CustomEvent<{ show: boolean }>;
      setShowExitBtn(customEvent.detail.show);
    };

    window.addEventListener('openPomodoro', handleOpenPomodoro);
    window.addEventListener('pomodoroNotification', handleNotification);
    window.addEventListener('nearExit', handleExitPrompt);

    return () => {
      window.removeEventListener('nearExit', handleExitPrompt);
      window.removeEventListener('openPomodoro', handleOpenPomodoro);
      window.removeEventListener('pomodoroNotification', handleNotification);
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [playPomodoroOpen]);

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
