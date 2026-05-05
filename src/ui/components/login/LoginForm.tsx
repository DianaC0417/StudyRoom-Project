import { type FormEvent, useState } from 'react';
import { userService } from '../../../config/dependencies';
import logoWhite from '../../../assets/BIT_STUDY_WHITE.png';
import logoBlack from '../../../assets/BIT_STUDY_BLACK.png';
import roomImg from '../../../assets/ISOMETRIC_ROOM.png';
import './LoginForm.css';

interface Props {
  onLogin?: (username: string) => void;
}

const LoginForm = ({ onLogin }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!username.trim()) e.username = 'Escribe tu nombre de usuario';
    if (!password) e.password = 'Escribe tu contraseña';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    await new Promise(r => setTimeout(r, 1500));

    try {
      const user = userService.login(username.trim(), false);
      console.log('Usuario logueado:', user);
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        onLogin?.(username.trim());
      }, 1200);
    } catch (error) {
      setErrors({
        username:
          error instanceof Error ? error.message : 'Error al iniciar sesión',
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* ═══ NAVBAR ═══ */}
      <nav className="login-navbar">
        <img src={logoWhite} alt="BitStudy" className="navbar-logo" />

        {/* Desktop nav links */}
        <ul className="navbar-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Join Us</a></li>
        </ul>

        {/* Hamburger (mobile) */}
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

      {/* Mobile nav overlay */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#" onClick={() => setMenuOpen(false)}>Join Us</a>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="login-content">
        {/* Room illustration */}
        <div className="room-illustration">
          <img src={roomImg} alt="Isometric Study Room" />
          <img src={logoBlack} alt="BitStudy" className="room-logo-diagonal" />
        </div>

        {/* Login card */}
        <div className="login-card">
          {success ? (
            <div className="success-message">
              <span className="success-icon">📖</span>
              <h3>¡Bienvenido, {username}!</h3>
              <p>Entrando a tu sala de estudio...</p>
            </div>
          ) : (
            <>
              <h1 className="card-title">
                Tu espacio de<br />aprendizaje
              </h1>

              <form onSubmit={handleSubmit} noValidate>
                <div className="input-group">
                  <input
                    className={`study-input ${errors.username ? 'error' : ''}`}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value);
                      setErrors(prev => ({ ...prev, username: undefined }));
                    }}
                    autoComplete="username"
                  />
                  {errors.username && <span className="input-error">{errors.username}</span>}
                </div>

                <div className="input-group">
                  <input
                    className={`study-input ${errors.password ? 'error' : ''}`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    autoComplete="current-password"
                  />
                  {errors.password && <span className="input-error">{errors.password}</span>}
                </div>

                <div className="options-row">
                  <button type="button" className="forgot-btn">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="btn-enter" disabled={loading}>
                  {loading && <span className="spin" />}
                  {loading ? 'Entering...' : 'LOGIN'}
                </button>
              </form>

              <div className="register-row">
                Don't have an account?{' '}
                <button type="button" onClick={() => console.log('→ ir a registro')}>
                  Register
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
