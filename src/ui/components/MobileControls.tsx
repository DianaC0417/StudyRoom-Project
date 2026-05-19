// ui/components/MobileControls.tsx
import React, { useEffect, useRef } from 'react';
import '../styles/MobileControls.css';

interface MobileControlsProps {
  isMobile: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ isMobile }) => {
  const activeTouches = useRef<Set<string>>(new Set());

  const sendMoveEvent = (direction: string, pressed: boolean) => {
    window.dispatchEvent(
      new CustomEvent('mobile-move', {
        detail: { direction, pressed },
      })
    );
  };

  const handleTouchStart = (direction: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    if (!activeTouches.current.has(direction)) {
      activeTouches.current.add(direction);
      sendMoveEvent(direction, true);
    }
  };

  const handleTouchEnd = (direction: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    if (activeTouches.current.has(direction)) {
      activeTouches.current.delete(direction);
      sendMoveEvent(direction, false);
    }
  };

  // Liberar todos los botones si el componente se desmonta
  useEffect(() => {
    return () => {
      ['up', 'down', 'left', 'right'].forEach((dir) => {
        sendMoveEvent(dir, false);
      });
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div className="mobile-controls-panel">
      <div className="dpad">
        <button
          className="ctrl-btn up"
          onTouchStart={handleTouchStart('up')}
          onTouchEnd={handleTouchEnd('up')}
          onTouchCancel={handleTouchEnd('up')}
        >
          ▲
        </button>
        <div className="mid-row">
          <button
            className="ctrl-btn left"
            onTouchStart={handleTouchStart('left')}
            onTouchEnd={handleTouchEnd('left')}
            onTouchCancel={handleTouchEnd('left')}
          >
            ◀
          </button>
          <button
            className="ctrl-btn down"
            onTouchStart={handleTouchStart('down')}
            onTouchEnd={handleTouchEnd('down')}
            onTouchCancel={handleTouchEnd('down')}
          >
            ▼
          </button>
          <button
            className="ctrl-btn right"
            onTouchStart={handleTouchStart('right')}
            onTouchEnd={handleTouchEnd('right')}
            onTouchCancel={handleTouchEnd('right')}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
