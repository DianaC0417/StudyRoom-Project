import LoginForm from '../components/login/LoginForm';

interface Props {
  onLogin?: (username: string) => void;
}

const LoginPage = ({ onLogin }: Props) => {
  return <LoginForm onLogin={onLogin} />;
};

export default LoginPage;
