// ui/components/MobileControls.tsx
import React, { useCallback, useRef } from 'react';
import '../styles/MobileControls.css';

interface MobileControlsProps {
  isMobile: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ isMobile }) => {
  // Guardamos las coordenadas donde el usuario inicia el toque
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  // Guardamos las direcciones que están activas actualmente para no repetir eventos redundantes
  const activeDirections = useRef<Set<string>>(new Set());

  const sendMoveEvent = useCallback((direction: string, pressed: boolean) => {
    window.dispatchEvent(
      new CustomEvent('mobile-move', {
        detail: { direction, pressed },
      })
    );
  }, []);

  const clearAllMoves = useCallback(() => {
    activeDirections.current.forEach((dir) => {
      sendMoveEvent(dir, false);
    });
    activeDirections.current.clear();
  }, [sendMoveEvent]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!touchStart.current) return;

    const touch = e.touches[0];
    // Calculamos la distancia (delta) entre el inicio y la posición actual del dedo
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    // Umbral mínimo de píxeles para registrar movimiento (evita micro-temblores del dedo)
    const threshold = 15;

    const newDirections = new Set<string>();

    // Evaluación del eje Horizontal (Izquierda / Derecha)
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        newDirections.add('right');
      } else {
        newDirections.add('left');
      }
    }

    // Evaluación del Eje Vertical (Arriba / Abajo)
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        newDirections.add('down');
      } else {
        newDirections.add('up');
      }
    }

    // Apagamos las direcciones que el dedo dejó de presionar
    activeDirections.current.forEach((dir) => {
      if (!newDirections.has(dir)) {
        sendMoveEvent(dir, false);
      }
    });

    // Encendemos las nuevas direcciones hacia donde se desplaza el dedo
    newDirections.forEach((dir) => {
      if (!activeDirections.current.has(dir)) {
        sendMoveEvent(dir, true);
      }
    });

    activeDirections.current = newDirections;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    touchStart.current = null;
    clearAllMoves(); // Al levantar el dedo el estudiante se detiene por completo
  };

  if (!isMobile) return null;

  return (
    <div
      className="mobile-touch-zone"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    />
  );
};
