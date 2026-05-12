import { useState } from 'react';
import LoginForm from '../components/login/LoginForm';
import logoWhite from '../../../../public/assets/BIT_STUDY_WHITE.png';
import logoBlack from '../../../../public/assets/BIT_STUDY_BLACK.png';
import roomImg from '../../../../public/assets/ISOMETRIC_ROOM.png';

import './LoginPage.css';

interface Props {
  onLogin?: (username: string) => void;
}

const LoginPage = ({ onLogin }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="login-page">
      
      <nav className="login-navbar">
        <img src={logoWhite} alt="BitStudy" className="navbar-logo" />

        
        <ul className="navbar-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Join Us</a>
          </li>
        </ul>

        
        <button
          className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <a href="#" onClick={() => setMenuOpen(false)}>
          Home
        </a>
        <a href="#" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <a href="#" onClick={() => setMenuOpen(false)}>
          Join Us
        </a>
      </div>

    
      <div className="login-content">
        {/* Room illustration */}
        <div className="room-illustration">
          <div className="room-wrapper">
            <img
              src={roomImg}
              alt="Isometric Study Room"
              className="room-img"
            />
            <img
              src={logoBlack}
              alt="BitStudy"
              className="room-logo-diagonal"
            />
          </div>
        </div>

        {/* Login form component */}
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
};

export default LoginPage;

