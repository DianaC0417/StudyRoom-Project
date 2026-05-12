// src/ui/components/login/LoginCard.tsx
import { useState, type FormEvent } from 'react';
import { userService } from '../../../config/dependencies';

interface Props {
  onLogin?: (username: string) => void;
}

const LoginCard = ({ onLogin }: Props) => {
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
    await new Promise((r) => setTimeout(r, 1500));
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
            Tu espacio de
            <br />
            aprendizaje
          </h1>
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
              {loading ? 'Entering...' : 'LOGIN'}
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
  );
};

export default LoginCard;
