import { useSound } from '../hooks/useSound';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import PublicLayout from '../components/PublicLayout';
import LoginCard from '../components/login/LoginCard';

interface Props {
  onLogin?: (username: string) => void;
}

const LoginPage = ({ onLogin }: Props) => {
  const playLogin = useSound('assets/sounds/start.mp3');
  useBackgroundMusic('/assets/sounds/background_music.mp3', true);

  const handleLoginWithSound = (username: string) => {
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

        {/* Tarjeta de login */}
        <LoginCard onLogin={handleLoginWithSound} />
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
