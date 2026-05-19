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
import { useMusic } from '../hooks/useMusic';
import { MusicPlayer } from '../components/music/MusicPlayer';
import { MusicSelector } from '../components/music/MusicSelector';
import { TodoList } from '../components/todo/TodoList';
import type { Room, StudyConfig } from '../../domain/StudyConfig';
import '../styles/RoomPage.css';
import '../components/music/MusicPlayer.css';
import { OrientationWarning } from '../components/OrientationWarning';

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

  const {
    mood,
    tracks,
    selectedTrack,
    isPlaying,
    isLoading,
    volume,
    error,
    loadMoodTracks,
    selectTrack,
    togglePlay,
    changeVolume,
    playNextTrack,
  } = useMusic();

  // Música de fondo por sala
  const musicMap: Record<Room, string> = {
    salaestudio1: 'assets/sounds/sala1.mp3',
    salaestudio2: 'assets/sounds/sala2.mp3',
    salaestudio3: 'assets/sounds/sala3.mp3',
  };
  const musicSrc = studyConfig?.sala ? musicMap[studyConfig.sala] : null;
  const { play: playMusic, pause: pauseMusic } = useBackgroundMusic(
    musicSrc || 'assets/sounds/sala1.mp3'
  );

  useEffect(() => {
    if (!musicSrc) return;

    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }

    return () => pauseMusic();
  }, [musicSrc, isPlaying, playMusic, pauseMusic]);

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

    const handleOpenMusicPlayer = () => {
      setShowMusicWidget(true);
    };
    window.addEventListener('openMusicPlayer', handleOpenMusicPlayer);

    const handleOpenTodoList = () => {
      setShowTodoWidget(true);
    };
    window.addEventListener('openTodoList', handleOpenTodoList);

    return () => {
      window.removeEventListener('nearExit', handleExitPrompt);
      window.removeEventListener('openPomodoro', handleOpenPomodoro);
      window.removeEventListener('pomodoroNotification', handleNotification);
      window.removeEventListener('openMusicPlayer', handleOpenMusicPlayer);
      window.removeEventListener('openTodoList', handleOpenTodoList);
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [playPomodoroOpen]);

  useEffect(() => {
    if (showMusicWidget) {
      playPomodoroOpen();
    }
  }, [showMusicWidget, playPomodoroOpen]);

  useEffect(() => {
    if (showTodoWidget) {
      playPomodoroOpen();
    }
  }, [showTodoWidget, playPomodoroOpen]);

  return (
    <div className="room-page">
      <div id="game-container" ref={gameRef} className="game-container"></div>
      {showMusicWidget && (
        <div
          className="pomodoro-modal-overlay"
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <div
            className="pomodoro-modal"
            style={{ width: '95%', maxWidth: '1000px' }}
          >
            <div className="pixel-border" style={{ padding: '2rem' }}>
              <div className="pixel-corner tl" />
              <div className="pixel-corner tr" />
              <div className="pixel-corner bl" />
              <div className="pixel-corner br" />

              <h2
                style={{
                  fontFamily: "'Retrobit', 'Courier New', monospace",
                  fontSize: '1.7rem',
                  color: '#fef9e7',
                  textAlign: 'center',
                  letterSpacing: '3px',
                  marginBottom: '1.5rem',
                }}
              >
                RADIO DE ESTUDIO
              </h2>

              {/* Contenedor de dos columnas */}
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {/* Columna izquierda: Selector */}
                <div
                  style={{
                    flex: '1 1 280px',
                    minWidth: '260px',
                    maxWidth: '400px',
                  }}
                >
                  <MusicSelector
                    mood={mood}
                    tracks={tracks}
                    selectedTrack={selectedTrack}
                    isLoading={isLoading}
                    onSelectMood={(selectedMood) => {
                      playClick();
                      loadMoodTracks(selectedMood);
                    }}
                    onSelectTrack={(track) => {
                      playClick();
                      selectTrack(track);
                    }}
                  />
                </div>

                <div
                  style={{
                    flex: '1 1 280px',
                    minWidth: '260px',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <MusicPlayer
                    selectedTrack={selectedTrack}
                    isPlaying={isPlaying}
                    volume={volume}
                    error={error}
                    onTogglePlay={() => {
                      playClick();
                      togglePlay();
                    }}
                    onChangeVolume={(newVolume) => {
                      changeVolume(newVolume);
                    }}
                    onNextTrack={() => {
                      playClick();
                      playNextTrack();
                    }}
                  />
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

      {showTodoWidget && (
        <div
          className="pomodoro-modal-overlay"
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <div
            className="pomodoro-modal"
            style={{ width: '95%', maxWidth: '450px' }} // Hecho más angosto para que calce bien tu To-Do
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
    </div>
  );
};
