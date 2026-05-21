import { Link } from 'react-router-dom';
import './login/LoginForm.css';

interface Props {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: Props) => {
  return (
    <div className="login-page">
      <nav className="login-navbar">
        <img
<<<<<<< HEAD
          src="/assets/extras/BIT_STUDY_WHITE.png"
=======
          src="/assets/BIT_STUDY_WHITE.png"
>>>>>>> origin/main
          alt="BitStudy"
          className="navbar-logo"
        />
        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/join">Join Us</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      {/* El contenido de cada página se coloca aquí, sin forzar ninguna estructura */}
      {children}
    </div>
  );
};

export default PublicLayout;
