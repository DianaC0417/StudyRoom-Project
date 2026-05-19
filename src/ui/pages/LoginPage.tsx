import { useEffect, useRef } from 'react';
import { useSound } from '../hooks/useSound';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import PublicLayout from '../components/PublicLayout';
import LoginCard from '../components/login/LoginCard';

interface Props {
  onLogin?: (username: string) => void;
}

const LoginPage = ({ onLogin }: Props) => {
  const playLogin = useSound('assets/sounds/start.mp3');
  const musicSrc = '/assets/sounds/background_music.mp3';
  const { play: playMusic, pause: pauseMusic } = useBackgroundMusic(musicSrc);
  const musicStartedRef = useRef(false);

  useEffect(() => {
    const startMusic = () => {
      if (musicStartedRef.current) return;
      musicStartedRef.current = true;
      playMusic();
    };
    window.addEventListener('click', startMusic);
    return () => {
      window.removeEventListener('click', startMusic);
      pauseMusic();
    };
  }, [playMusic, pauseMusic]);

  const handleLoginWithSound = (username: string) => {
    playLogin();
    if (!musicStartedRef.current) {
      musicStartedRef.current = true;
      playMusic();
    }
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

        {/* Tarjeta de login */}
        <LoginCard onLogin={handleLoginWithSound} />
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
