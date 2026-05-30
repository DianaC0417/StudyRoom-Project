// ui/components/OrientationWarning.tsx
import React, { useEffect, useState } from 'react';
import '../styles/OrientationWarning.css';

export const OrientationWarning: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="orientation-warning-overlay">
      <div className="orientation-warning-box">
        <p>📱 GIRA TU DISPOSITIVO</p>
        <p>
          Para una mejor experiencia, usa la pantalla en{' '}
          <strong>horizontal</strong>.
        </p>
        <div className="rotate-icon">🔄</div>
        <button onClick={() => setIsPortrait(false)}>Entendido</button>
      </div>
    </div>
  );
};
