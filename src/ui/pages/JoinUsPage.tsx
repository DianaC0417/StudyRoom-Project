import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import './NavPages.css';

const JoinUsPage = () => {
  useBackgroundMusic('/assets/sounds/background_music.mp3', true);

  return (
    <PublicLayout>
      <div className="join-content">
        <h2 className="join-heading">UNETE A LA COMUNIDAD</h2>
        <div className="join-row">
          <div className="join-text">
            <p className="join-intro">
              Transforma tu manera de estudiar. En BitStudy cada sesion se
              convierte en una aventura junto a tu mascota ideal, en un ambiente
              elegido para ti.
            </p>
            <p className="join-desc">
              Registrate hoy y descubre salas de estudio interactivas,
              herramientas de concentracion y una comunidad que te impulsa a dar
              lo mejor de ti.
            </p>
            <Link to="/login" className="join-btn">
              UNIRME
            </Link>
          </div>

          <div className="join-image">
            <img
              src="/assets/extras/libro_joinus.png"
              alt="Libro abierto con ideas brillando"
              className="join-illustration"
            />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default JoinUsPage;
