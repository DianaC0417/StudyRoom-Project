// ui/components/PomodoroModal.tsx
import React from 'react';
import './PomodoroModal.css';

interface PomodoroModalProps {
  show: boolean;
  message: string;
  timeDisplay: string;
  isActive: boolean;
  isBreak: boolean;
  currentSession: number;
  totalSessions: number;
  progress: number;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
  onClose: () => void;
}

export const PomodoroModal: React.FC<PomodoroModalProps> = ({
  show,
  message,
  timeDisplay,
  isActive,
  isBreak,
  currentSession,
  totalSessions,
  progress,
  onToggle,
  onReset,
  onSkip,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="pomodoro-modal-overlay">
      <div className="pomodoro-modal">
        {/* Pixel Art Border Decoration */}
        <div className="pixel-border">
          <div className="pixel-corner tl"></div>
          <div className="pixel-corner tr"></div>
          <div className="pixel-corner bl"></div>
          <div className="pixel-corner br"></div>

          {/* Header con estado */}
          <div
            className={`modal-header ${isBreak ? 'break-mode' : 'work-mode'}`}
          >
            <div className="session-indicator">
              <span className="session-label">SESIÓN</span>
              <span className="session-number">
                {currentSession}/{totalSessions}
              </span>
            </div>
            <div className="status-badge">
              <span className="status-icon">{isBreak ? '☕' : '📚'}</span>
              <span className="status-text">
                {isBreak ? 'DESCANSO' : 'ESTUDIO'}
              </span>
            </div>
          </div>

          {/* Mensaje motivacional */}
          <div className="modal-message">
            <p className="pixel-text">{message}</p>
          </div>

          {/* Timer Display Pixel Art */}
          <div className="timer-container">
            <div className="pixel-screen">
              <div className="screen-glare"></div>
              <span className="timer-digits">{timeDisplay}</span>
            </div>

            {/* Progress Bar Pixel Art */}
            <div className="progress-container">
              <div className="progress-label">PROGRESO</div>
              <div className="pixel-progress-bar">
                <div
                  className="pixel-progress-fill"
                  style={{ width: `${progress}%` }}
                >
                  <div className="progress-pixel"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de control */}
          <div className="modal-controls">
            <button className="pixel-btn pixel-btn-primary" onClick={onToggle}>
              <span className="btn-icon">{isActive ? '⏸' : '▶'}</span>
              {isActive ? 'PAUSAR' : 'EMPEZAR'}
            </button>

            <button className="pixel-btn pixel-btn-secondary" onClick={onSkip}>
              <span className="btn-icon">⏩</span>
              SALTAR
            </button>
            <button className="pixel-btn pixel-btn-danger" onClick={onReset}>
              <span className="btn-icon">🔄</span>
              REINICIAR
            </button>
          </div>

          {/* Tips motivacionales */}
          <div className="modal-footer">
            <div className="pixel-tip">
              💡 TIP:{' '}
              {isBreak
                ? 'Levántate, estírate y toma agua'
                : 'Mantén el enfoque, tú puedes!'}
            </div>
            <button className="close-btn" onClick={onClose}>
              CERRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
