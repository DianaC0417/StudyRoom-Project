import LoginForm from '../components/login/LoginForm';
import { useEffect } from 'react';
import { useSound } from '../hooks/useSound';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';

interface Props {
  onLogin?: (username: string) => void;
}

const LoginPage = ({ onLogin }: Props) => {
  const playLogin = useSound('assets/sounds/start.mp3');
  const musicSrc = 'assets/sounds/background_music.mp3';
  const { play: playMusic, pause: pauseMusic } = useBackgroundMusic(musicSrc);

  useEffect(() => {
    playMusic();
    return () => pauseMusic();
  }, [playMusic, pauseMusic]);

  const handleLoginWithSound = (username: string) => {
    playLogin();
    onLogin?.(username);
  };
  return <LoginForm onLogin={handleLoginWithSound} />;
};

export default LoginPage;
