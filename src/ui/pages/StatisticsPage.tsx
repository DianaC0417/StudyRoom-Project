import UserMenuNavbar from '../components/UserMenuNavBar';
import '../styles/UserPrivatePages.css';

interface StatisticsPageProps {
  onLogout: () => void;
}

const StatisticsPage = ({ onLogout }: StatisticsPageProps) => {
  return (
    <div className="private-page">
      <UserMenuNavbar title="Statistics" onLogout={onLogout} />

      <main className="private-page-content">
        <section className="private-card">
          <h2>Statistics</h2>

          <p>
            Aqui se mostraran tus datos de estudio, tiempo acumulado, sesiones y
            progreso general.
          </p>

          <div className="private-placeholder">
            <span>Coming soon...</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StatisticsPage;
