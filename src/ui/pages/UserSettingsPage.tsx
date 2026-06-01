import UserMenuNavbar from '../components/UserMenuNavBar';
import '../styles/UserPrivatePages.css';

interface UserSettingsPageProps {
  onLogout: () => void;
}

const UserSettingsPage = ({ onLogout }: UserSettingsPageProps) => {
  return (
    <div className="private-page">
      <UserMenuNavbar title="User Settings" onLogout={onLogout} />

      <main className="private-page-content">
        <section className="private-card">
          <h2>User Settings</h2>

          <p>
            Aqui podras configurar la informacion de tu usuario, preferencias y
            opciones de tu cuenta.
          </p>

          <div className="private-placeholder">
            <span>Coming soon...</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserSettingsPage;
