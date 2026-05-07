import LoginForm from '../components/login/LoginForm';
import { useSound } from '../hooks/useSound';

interface Props {
  onLogin?: (username: string) => void;
}

const LoginPage = ({ onLogin }: Props) => {
  const playLogin = useSound('assets/sounds/start.mp3');
  const handleLoginWithSound = (username: string) => {
    playLogin();
    onLogin?.(username);
  };
  return <LoginForm onLogin={handleLoginWithSound} />;
};

export default LoginPage;
