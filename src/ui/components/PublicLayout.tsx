//src/ui/components/PublicLayout.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login/LoginForm.css';

interface Props {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="login-page">
      <nav className="login-navbar">
        <img
          src="/assets/extras/BIT_STUDY_WHITE.png"
          alt="BitStudy"
          className="navbar-logo"
        />

        {/* Enlaces de escritorio */}
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

        {/* Botón hamburguesa (visible solo en móvil) */}
        <button
          className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Menú móvil */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/home" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        <Link to="/join" onClick={closeMenu}>
          Join Us
        </Link>
        <Link to="/login" onClick={closeMenu}>
          Login
        </Link>
      </div>

      {children}
    </div>
  );
};

export default PublicLayout;
