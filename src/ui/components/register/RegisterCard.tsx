// src/ui/components/register/RegisterCard.tsx
import { useState, type FormEvent } from 'react';
import { userService } from '../../../config/dependencies';
import './RegisterCard.css';

interface Props {
  onRegister?: (username: string) => void;
  onSwitchToLogin?: () => void;
}

const RegisterCard = ({ onRegister, onSwitchToLogin }: Props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!username.trim()) e.username = 'Escribe tu nombre de usuario';
    else if (username.length < 3) e.username = 'Mínimo 3 caracteres';

    if (!email.trim()) e.email = 'Escribe tu correo electrónico';
    else if (!validateEmail(email)) e.email = 'Correo electrónico inválido';

    if (!password) e.password = 'Escribe tu contraseña';
    else if (password.length < 6) e.password = 'Mínimo 6 caracteres';

    if (!confirmPassword) e.confirmPassword = 'Confirma tu contraseña';
    else if (password !== confirmPassword)
      e.confirmPassword = 'Las contraseñas no coinciden';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // Asume que userService.register(username, email, password) existe
      const newUser = await userService.register(
        username.trim(),
        email.trim(),
        password,
        true
      ); // true si quieres "recordarme"
      console.log('Usuario registrado exitosamente:', newUser);

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        onRegister?.(username.trim());
      }, 1200);
    } catch (error) {
      let errorMessage = 'Error al registrar. Intenta de nuevo.';
      if (error instanceof Error) {
        if (error.message.includes('email'))
          errorMessage = 'El correo electrónico ya está registrado';
        else if (error.message.includes('username'))
          errorMessage = 'El nombre de usuario ya está en uso';
        else errorMessage = error.message;
      }
      setErrors({ email: errorMessage });
      setLoading(false);
    }
  };

  return (
    <div className="register-card">
      {success ? (
        <div className="success-message">
          <span className="success-icon">✨</span>
          <h3>¡Cuenta creada, {username}!</h3>
          <p>Redirigiendo a tu espacio de estudio...</p>
        </div>
      ) : (
        <>
          <h1 className="card-title">
            Crea tu cuenta
            <br />y empieza a aprender
          </h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <input
                className={`study-input ${errors.username ? 'error' : ''}`}
                type="text"
                placeholder="Nombre de usuario"
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
                autoComplete="new-password"
              />
              {errors.password && (
                <span className="input-error">{errors.password}</span>
              )}
            </div>

            <div className="input-group">
              <input
                className={`study-input ${errors.confirmPassword ? 'error' : ''}`}
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }}
                autoComplete="off"
              />
              {errors.confirmPassword && (
                <span className="input-error">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="btn-enter" disabled={loading}>
              {loading && <span className="spin" />}
              {loading ? 'Creando cuenta...' : 'REGISTRARME'}
            </button>
          </form>

          <div className="register-row">
            ¿Ya tienes una cuenta?{' '}
            <button type="button" onClick={onSwitchToLogin}>
              Iniciar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterCard;
