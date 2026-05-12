import LoginForm from "../components/login/LoginForm";
import "./LoginPage.css";

interface Props {
  onLogin?: (username: string) => void;
}

const LoginPage = ({ onLogin }: Props) => {
  return (
    <div className="login-page">
      {/* Navbar */}
      <nav className="login-navbar">
        <img src="/assets/BIT_STUDY_WHITE.png" alt="BitStudy" className="navbar-logo" />
        <ul className="navbar-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Join Us</a></li>
        </ul>
      </nav>

      {/* Ilustración */}
      <div className="room-illustration">
        <img src="/assets/ISOMETRIC_ROOM.png" alt="Isometric Study Room" />
      </div>

      {/* Login card */}
      <div className="login-card">
        <h1 className="card-title">Tu espacio de aprendizaje</h1>
        <LoginForm onLogin={onLogin} />
        <p className="register-text">¿No tienes cuenta? Regístrate aquí</p>
      </div>
    </div>
  );
};

export default LoginPage;
