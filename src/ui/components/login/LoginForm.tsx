import { FormEvent, CSSProperties, useState } from 'react';
import { userAdapter } from '../../../adapters/userAdapter';
import './LoginForm.css';

// ─── Generador de estrellas ───────────────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    top: Math.random() * 70,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.7 + 0.3,
  }));

  return (
    <div className="stars">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
                  style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--duration': `${s.duration}s`,
              '--delay': `${s.delay}s`,
              '--max-opacity': s.opacity,
            } as CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── SVG Montañas ────────────────────────────────────────────────────────────
function Mountains() {
  return (
    <div className="mountains">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,200 200,60 380,130 550,40 720,120 900,30 1100,110 1280,50 1440,90 1440,200" fill="#1a0e50" />
        <polygon points="0,200 150,90 300,150 480,70 650,140 820,60 1000,130 1200,80 1440,110 1440,200" fill="#2a1260" opacity="0.7" />
      </svg>
    </div>
  );
}

// ─── SVG Árboles ─────────────────────────────────────────────────────────────
function TreesBack() {
  return (
    <div className="trees-back">
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200, 1280, 1360].map((x, i) => {
          const h = 100 + Math.sin(i * 1.3) * 40;
          const w = 55 + (i % 3) * 10;
          return (
            <g key={i}>
              <polygon
                points={`${x + w / 2},${220 - h} ${x},220 ${x + w},220`}
                fill="#1e0d45"
                opacity={0.6 + (i % 3) * 0.15}
              />
              <polygon
                points={`${x + w / 2},${220 - h * 0.7} ${x + 8},220 ${x + w - 8},220`}
                fill="#16093a"
                opacity={0.4}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function TreesFront() {
  return (
    <div className="trees-front">
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {[-20, 60, 140, 220, 310, 390, 470, 560, 650, 730, 820, 900, 990, 1080, 1160, 1250, 1340].map((x, i) => {
          const h = 130 + Math.cos(i * 1.7) * 50;
          const w = 70 + (i % 4) * 12;
          return (
            <g key={i}>
              <polygon
                points={`${x + w / 2},${220 - h} ${x},220 ${x + w},220`}
                fill="#0d0720"
              />
              <polygon
                points={`${x + w / 2},${220 - h * 0.65} ${x + 10},220 ${x + w - 10},220`}
                fill="#08051a"
                opacity={0.6}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────
interface Props {
  onLogin?: (username: string) => void;
}

const LoginForm = ({ onLogin }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    // Simulación de delay de red
    await new Promise(r => setTimeout(r, 1500));

    // ── Llamada al adaptador: guarda el userId ──
    userAdapter.saveUserId(username.trim(), remember);

    setLoading(false);
    setSuccess(true);

    // Redirige a la siguiente pantalla después de 1.2s
    setTimeout(() => {
      onLogin?.(username.trim());
      // Si usas React Router: navigate('/dashboard')
      console.log('✅ Usuario guardado, redirigir a /dashboard');
    }, 1200);
  };

  return (
    <div className="login-scene">
      {/* Fondo */}
      <div className="sky" />
      <Stars />
      <div className="moon" />
      <Mountains />
      <TreesBack />
      <div className="ground-glow" />
      <TreesFront />

      {/* Card */}
      <div className="login-card">
        {success ? (
          <div className="success-message">
            <span className="success-icon">📖</span>
            <h3>¡Bienvenido, {username}!</h3>
            <p>Entrando a tu sala de estudio...</p>
          </div>
        ) : (
          <>
            <div className="card-icon">🦉</div>
            <h1 className="card-title">Study Room</h1>
            <p className="card-subtitle">Tu espacio de aprendizaje nocturno</p>

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
                <span className="input-icon">👤</span>
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
                <span className="input-icon">🔒</span>
                {errors.password && <span className="input-error">{errors.password}</span>}
              </div>

              <div className="options-row">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <button type="button" className="forgot-btn">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="btn-enter" disabled={loading}>
                {loading && <span className="spin" />}
                {loading ? 'Entering...' : 'Login'}
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
  );
};

export default LoginForm;