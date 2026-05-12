import LoginForm from "../components/login/LoginForm";
import "./Landing.css"; 
import useSound from "use-sound";
import loginSound from "/assets/login-sound.mp3";

interface Props {
  onLogin?: (username: string) => void;
}

const LoginPage = ({ onLogin }: Props) => {
  const [play] = useSound(loginSound);

  const handleLogin = (username: string) => {
    play();
    if (onLogin) onLogin(username);
  };

  return (
    <div className="login-page">
      <nav className="login-navbar">
        <img
          src="/assets/BIT_STUDY_WHITE.png"
          alt="BitStudy"
          className="navbar-logo"
        />
        <ul className="navbar-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Join Us</a></li>
        </ul>
      </nav>

      <div className="room-illustration">
        <img
          src="/assets/ISOMETRIC_ROOM.png"
          alt="Isometric Study Room"
        />
      </div>

     
      <div className="login-card">
        <h1 className="card-title">Tu espacio de aprendizaje</h1>
        <LoginForm onLogin={handleLogin} />
        <p className="register-text">¿No tienes cuenta? Regístrate aquí</p>
      </div>
    </div>
  );
};

export default LoginPage;
