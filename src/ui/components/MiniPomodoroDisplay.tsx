// src/ui/components/MiniPomodoroDisplay.tsx
import React from 'react';

interface MiniPomodoroDisplayProps {
  show: boolean;
  timeDisplay: string;
  isActive: boolean;
  isBreak: boolean;
  currentSession: number;
  totalSessions: number;
  progress: number;
}

export const MiniPomodoroDisplay: React.FC<MiniPomodoroDisplayProps> = ({
  show,
  timeDisplay,
  isActive,
  isBreak,
  currentSession,
  totalSessions,
  progress,
}) => {
  if (!show) return null;

  return (
    <div className={`mini-pomodoro-display ${isBreak ? 'break' : 'work'}`}>
      <div className="mini-pomodoro-top">
        <span className="mini-pomodoro-icon">{isBreak ? '☕' : '📚'}</span>
        <span className="mini-pomodoro-mode">
          {isBreak ? 'DESCANSO' : 'ESTUDIO'}
        </span>
      </div>

      <div className="mini-pomodoro-time">{timeDisplay}</div>

      <div className="mini-pomodoro-bottom">
        <span>
          SESIÓN {currentSession}/{totalSessions}
        </span>
        <span>{isActive ? 'ACTIVO' : 'PAUSADO'}</span>
      </div>

      <div className="mini-pomodoro-progress">
        <div
          className="mini-pomodoro-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
