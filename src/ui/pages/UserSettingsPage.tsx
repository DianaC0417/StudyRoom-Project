// src/ui/pages/UserSettingsPage.tsx
import { useState, type FormEvent } from 'react';
import UserMenuNavbar from '../components/UserMenuNavBar';
import { userService } from '../../config/dependencies';
import '../styles/UserPrivatePages.css';

interface UserSettingsPageProps {
  onLogout: () => void;
}

const UserSettingsPage = ({ onLogout }: UserSettingsPageProps) => {
  const currentUser = userService.getCurrentUser();

  const [username, setUsername] = useState(currentUser?.username ?? '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateUsername = (value: string): string | null => {
    const cleanUsername = value.trim();

    if (!cleanUsername) {
      return 'El nombre de usuario no puede estar vacío';
    }

    if (cleanUsername.length < 3) {
      return 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (cleanUsername.length > 20) {
      return 'El nombre de usuario no puede tener más de 20 caracteres';
    }

    const validUsername = /^[a-zA-Z0-9_]+$/.test(cleanUsername);

    if (!validUsername) {
      return 'Solo puedes usar letras, números y guion bajo';
    }

    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage('');
    setError('');

    if (!currentUser) {
      setError('No hay un usuario autenticado. Vuelve a iniciar sesión.');
      return;
    }

    const cleanUsername = username.trim();
    const validationError = validateUsername(cleanUsername);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (cleanUsername === currentUser.username) {
      setError('Escribe un nombre diferente al actual.');
      return;
    }

    try {
      setLoading(true);

      const updatedUser = await userService.updateUsername(cleanUsername);

      setUsername(updatedUser.username);
      setMessage('Nombre de usuario actualizado correctamente.');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo actualizar el nombre de usuario.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="private-page">
      <UserMenuNavbar title="User Settings" onLogout={onLogout} />

      <main className="private-page-content">
        <section className="private-card user-settings-card">
          <h2>Configuración de usuario</h2>

          <p>
            Desde esta sección puedes modificar únicamente tu nombre de usuario.
            Este será el nombre que aparecerá en tu sala de estudio.
          </p>

          {!currentUser ? (
            <div className="settings-message settings-message-error">
              No hay un usuario autenticado. Inicia sesión nuevamente.
            </div>
          ) : (
            <form className="settings-form" onSubmit={handleSubmit}>
              <div className="settings-current-user">
                <span>Usuario actual</span>
                <strong>{currentUser.username}</strong>
              </div>

              <label className="settings-label" htmlFor="username">
                Nuevo nombre de usuario
              </label>

              <input
                id="username"
                className="settings-input"
                type="text"
                value={username}
                placeholder="Escribe tu nuevo username"
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError('');
                  setMessage('');
                }}
                disabled={loading}
                maxLength={20}
              />

              <small className="settings-help">
                Usa entre 3 y 20 caracteres. Solo letras, números y guion bajo.
              </small>

              {error && (
                <div className="settings-message settings-message-error">
                  {error}
                </div>
              )}

              {message && (
                <div className="settings-message settings-message-success">
                  {message}
                </div>
              )}

              <button
                className="settings-save-button"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserSettingsPage;
