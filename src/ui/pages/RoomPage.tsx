// ui/pages/RoomPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { StudyRoomScene } from '../../game/scenes/StudyRoomScene';
import { gameConfig } from '../../game/config';
import { usePomodoro } from '../hooks/usePomodoro';
import { PomodoroModal } from '../components/PomodoroModal';
import { useNavigate } from 'react-router-dom';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { useSound } from '../hooks/useSound';
import type { Room, StudyConfig } from '../../domain/StudyConfig';
import '../styles/RoomPage.css';
import { OrientationWarning } from '../components/OrientationWarning';

export const RoomPage: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const [showExitBtn, setShowExitBtn] = useState(false);

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

  const [config] = useState<StudyConfig | null>(() => {
    const data = localStorage.getItem('user_study_config');
    if (data) {
      try {
        return JSON.parse(data) as StudyConfig;
      } catch {
        //xxx
      }
    }
    return null;
  });

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

  const playPomodoroOpen = useSound('assets/sounds/inputclick.mp3');

  const playClick = useSound('assets/sounds/select_personaje.mp3');
  //const playClose = useSound('assets/sounds/close.mp3');

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

  const playExit = useSound('assets/sounds/close.mp3');
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

    const handleOpenPomodoro = (event: CustomEvent) => {
      setModalMessage(event.detail.message);
      setShowModal(true);
      playPomodoroOpen(); // 🔊 sonido al abrir
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
  }, [navigate, playPomodoroOpen]); // agregamos playPomodoroOpen como dependencia

  return (
    <div className="room-page">
      <div id="game-container" ref={gameRef} className="game-container"></div>

      {/* Botón SALIR*/}
      {showExitBtn && (
        <button onClick={handleExit} className="exit-button-pixel">
          SALIR
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
      <OrientationWarning />
    </div>
  );
};
