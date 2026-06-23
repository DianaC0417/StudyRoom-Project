//src/ui/pages/LoginPage.tsx
import { useState } from 'react';
import { useSound } from '../hooks/useSound';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import PublicLayout from '../components/PublicLayout';
import LoginCard from '../components/login/LoginCard';
import RegisterCard from '../components/register/RegisterCard';

interface Props {
  onLogin?: (username: string) => void;
}

const LoginPage = ({ onLogin }: Props) => {
  const playLogin = useSound('assets/sounds/start.mp3');
  useBackgroundMusic('/assets/sounds/background_music.mp3', true);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginWithSound = (username: string) => {
    playLogin();
    onLogin?.(username);
  };

  const handleSwitchToRegister = () => setShowRegister(true);
  const handleSwitchToLogin = () => setShowRegister(false);

  const handleRegister = (username: string) => {
    playLogin();
    onLogin?.(username);
  };

  return (
    <PublicLayout>
      <div className="login-content">
        {/* Illustración */}
        <div className="room-illustration">
          <div className="room-wrapper">
            <img
              src="/assets/extras/ISOMETRIC_ROOM.png"
              alt="Isometric Study Room"
              className="room-img"
            />
            <img
              src="/assets/extras/BIT_STUDY.png"
              alt="BitStudy"
              className="room-logo-diagonal"
            />
          </div>
        </div>

        {/* Tarjeta de login / register */}
        {showRegister ? (
          <RegisterCard
            onRegister={handleRegister}
            onSwitchToLogin={handleSwitchToLogin}
          />
        ) : (
          <LoginCard
            onLogin={handleLoginWithSound}
            onSwitchToRegister={handleSwitchToRegister}
          />
        )}
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
