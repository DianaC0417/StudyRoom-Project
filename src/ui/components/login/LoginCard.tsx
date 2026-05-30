import { useState, type FormEvent } from 'react';
import { userService } from '../../../config/dependencies';

interface Props {
  onLogin?: (username: string) => void;
  onSwitchToRegister?: () => void;
}

const LoginCard = ({ onLogin, onSwitchToRegister }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Escribe tu correo electrónico';
    if (!password) e.password = 'Escribe tu contraseña';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const user = await userService.login(email.trim(), password, false);
      console.log('Usuario logueado exitosamente:', user);

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        onLogin?.(email.trim());
      }, 1200);
    } catch (error) {
      let errorMsg =
        error instanceof Error
          ? error.message
          : 'Usuario o contraseña incorrectos';

      // Si el backend responde en inglés, lo ponemos bonito en español
      if (errorMsg === 'Invalid credentials') {
        errorMsg = 'El correo o la contraseña no coinciden';
      }

      setErrors({ email: errorMsg });
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      {success ? (
        <div className="success-message">
          <span className="success-icon">📖</span>
          <h3>¡Bienvenido!</h3>
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
                className={`study-input ${errors.email ? 'error' : ''}`}
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                autoComplete="email"
              />
              {errors.email && (
                <span className="input-error">{errors.email}</span>
              )}
            </div>
            <div className="input-group">
              <input
                className={`study-input ${errors.password ? 'error' : ''}`}
                type="password"
                placeholder="Contraseña"
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
              {loading ? 'Entrando...' : 'LOGIN'}
            </button>
          </form>
          <div className="register-row">
            ¿No tienes cuenta?{' '}
            <button type="button" onClick={() => onSwitchToRegister?.()}>
              Registrarse
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginCard;