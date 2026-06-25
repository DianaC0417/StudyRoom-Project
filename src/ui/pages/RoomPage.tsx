import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { StudyRoomScene } from '../../game/scenes/StudyRoomScene';
import { gameConfig } from '../../game/config';
import { usePomodoro } from '../hooks/usePomodoro';
import { PomodoroModal } from '../components/PomodoroModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { useSound } from '../hooks/useSound';
import { MusicPlayer } from '../components/music/MusicPlayer';
import { MusicSelector } from '../components/music/MusicSelector';
import { TodoList } from '../components/todo/TodoList';
import type { Room, StudyConfig } from '../../domain/StudyConfig';
import '../styles/RoomPage.css';
import '../components/music/MusicPlayer.css';
import { OrientationWarning } from '../components/OrientationWarning';
import { MobileControls } from '../components/MobileControls';

export const RoomPage: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [showExitBtn, setShowExitBtn] = useState(false);
  const [showMusicWidget, setShowMusicWidget] = useState(false);
  const [showTodoWidget, setShowTodoWidget] = useState(false);

  const studyConfig = location.state as StudyConfig | undefined;

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
    salaestudio1: '/assets/sounds/sala1.mp3',
    salaestudio2: '/assets/sounds/sala2.mp3',
    salaestudio3: '/assets/sounds/sala3.mp3',
  };
  const musicSrc = studyConfig?.sala ? musicMap[studyConfig.sala] : null;
  
  // Custom hook para música de fondo sin destructuraciones sin usar
  useBackgroundMusic(
    musicSrc || '/assets/sounds/sala1.mp3',
    true
  );

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

  const getIsMobile = () =>
    Math.min(window.innerWidth, window.innerHeight) <= 768 ||
    'ontouchstart' in window;

  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      setIsMobile(getIsMobile());
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        window.location.reload();
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

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

    const handleExitRoom = () => {
      playExit();
      navigate('/customization');
    };

    window.addEventListener('openPomodoro', handleOpenPomodoro);
    window.addEventListener('pomodoroNotification', handleNotification);
    window.addEventListener('nearExit', handleExitPrompt);
    window.addEventListener('exitRoom', handleExitRoom);

    const handleOpenMusicPlayer = () => setShowMusicWidget(true);
    window.addEventListener('openMusicPlayer', handleOpenMusicPlayer);

    const handleOpenTodoList = () => setShowTodoWidget(true);
    window.addEventListener('openTodoList', handleOpenTodoList);

    return () => {
      window.removeEventListener('nearExit', handleExitPrompt);
      window.removeEventListener('openPomodoro', handleOpenPomodoro);
      window.removeEventListener('pomodoroNotification', handleNotification);
      window.removeEventListener('openMusicPlayer', handleOpenMusicPlayer);
      window.removeEventListener('openTodoList', handleOpenTodoList);
      window.removeEventListener('exitRoom', handleExitRoom);
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [playPomodoroOpen, navigate, playExit]);

  useEffect(() => {
    if (showMusicWidget) playPomodoroOpen();
  }, [showMusicWidget, playPomodoroOpen]);

  useEffect(() => {
    if (showTodoWidget) playPomodoroOpen();
  }, [showTodoWidget, playPomodoroOpen]);

  return (
    <div className="room-page">
      <div id="game-container" ref={gameRef} className="game-container"></div>

      {/* ==========================================================================
         WIDGET DEL POMODORO FLOTANTE EN LA ESQUINA SUPERIOR DERECHA
         ========================================================================== */}
      <div 
        className="pomodoro-corner-widget pixel-border"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(71, 68, 68, 0.92)',
          color: '#ffffff',
          padding: '10px 15px',
          borderRadius: '8px',
          border: '3px solid #222222',
          fontFamily: "'Retrobit', 'Courier New', monospace",
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          minWidth: '140px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}
      >
        <div className="pixel-corner tl" />
        <div className="pixel-corner tr" />
        <div className="pixel-corner bl" />
        <div className="pixel-corner br" />

        <span style={{ fontSize: '0.65rem', color: isBreak ? '#8bd3dd' : '#ffb5a7', letterSpacing: '1px' }}>
          {isBreak ? '☕ DESCANSO' : '⏱️ ESTUDIO'}
        </span>
        
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '1px', fontFamily: "'GamePaused', monospace" }}>
          {timeDisplay}
        </span>

        <span style={{ fontSize: '0.55rem', color: '#fef9e7', opacity: 0.8 }}>
          SESIÓN: {currentSession}/{totalSessions}
        </span>

        <button
          onClick={handleToggle}
          style={{
            marginTop: '4px',
            background: '#141414',
            color: '#fff',
            border: '2px solid #222',
            fontSize: '0.55rem',
            padding: '2px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontFamily: "'Retrobit', 'Courier New', monospace"
          }}
        >
          {isActive ? 'PAUSA' : 'INICIAR'}
        </button>
      </div>

      {/* ==========================================================================
         RADIO DE ESTUDIO MODAL
         ========================================================================== */}
      {showMusicWidget && (
        <div
          className="pomodoro-modal-overlay"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <div
            className="pomodoro-modal"
            style={{
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
            }}
          >
            <div
              className="pixel-border"
              style={{ padding: isMobile ? '1rem' : '2rem' }}
            >
              <div className="pixel-corner tl" />
              <div className="pixel-corner tr" />
              <div className="pixel-corner bl" />
              <div className="pixel-corner br" />

              <h2
                style={{
                  fontFamily: "'Retrobit', 'Courier New', monospace",
                  fontSize: isMobile ? '1.3rem' : '1.7rem',
                  color: '#fef9e7',
                  textAlign: 'center',
                  letterSpacing: '3px',
                  marginBottom: '1.5rem',
                }}
              >
                RADIO DE ESTUDIO
              </h2>

              <div
                style={{
                  display: 'flex',
                  gap: isMobile ? '1rem' : '2rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <div style={{ flex: '1 1 260px', maxWidth: '400px' }}>
                  <MusicSelector />
                </div>

                <div
                  style={{
                    flex: '1 1 260px',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <MusicPlayer />
                  <div style={{ marginTop: '1rem' }}>
                    <button
                      className="close-btn"
                      onClick={() => {
                        playClick();
                        setShowMusicWidget(false);
                      }}
                    >
                      ✖ CERRAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
         TODO LIST MODAL
         ========================================================================== */}
      {showTodoWidget && (
        <div
          className="pomodoro-modal-overlay"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <div
            className="pomodoro-modal"
            style={{
              width: '100%',
              maxWidth: '400px',
              maxHeight: '90vh',
            }}
          >
            <div className="pixel-border" style={{ padding: '1.5rem' }}>
              <div className="pixel-corner tl" />
              <div className="pixel-corner tr" />
              <div className="pixel-corner bl" />
              <div className="pixel-corner br" />

              <TodoList />

              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button
                  className="close-btn"
                  onClick={() => {
                    playClick();
                    setShowTodoWidget(false);
                  }}
                >
                  ✖ CERRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
      <MobileControls
        isMobile={isMobile && !showModal && !showMusicWidget && !showTodoWidget}
      />
    </div>
  );
};