import { type FormEvent, useState } from 'react';
import { localStorageAdapter } from '../../../adapters/localStorageAdapter';
import fondo from '../login/fondo.png';
import './LoginForm.css';

// ─── Componente principal ────────────────────────────────────────────────────
interface Props {
  onLogin?: (username: string) => void;
}

const LoginForm = ({ onLogin }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
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
    await new Promise((r) => setTimeout(r, 1500));

    // ── Llamada al adaptador: guarda el userId ──
    localStorageAdapter.saveUser(username.trim());

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
      <div className="sky" style={{ backgroundImage: `url(${fondo})` }} />

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
            <h1 className="card-title">Study Room</h1>
            <p className="card-subtitle">Tu espacio de aprendizaje</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <input
                  className={`study-input ${errors.username ? 'error' : ''}`}
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors((prev) => ({ ...prev, username: undefined }));
                  }}
                  autoComplete="username"
                />
                <span className="input-icon">👤</span>
                {errors.username && (
                  <span className="input-error">{errors.username}</span>
                )}
              </div>

              <div className="input-group">
                <input
                  className={`study-input ${errors.password ? 'error' : ''}`}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  autoComplete="current-password"
                />
                <span className="input-icon">🔒</span>
                {errors.password && (
                  <span className="input-error">{errors.password}</span>
                )}
              </div>

              <div className="options-row">
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
              <button
                type="button"
                onClick={() => console.log('→ ir a registro')}
              >
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
