import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import PublicLayout from '../components/PublicLayout';
import { useSound } from '../hooks/useSound';
import { useNavigate } from 'react-router-dom';
import './NavPages.css';

const HomePage = () => {
  const playClick = useSound('/assets/sounds/select_personaje.mp3');
  const navigate = useNavigate();
  useBackgroundMusic('/assets/sounds/background_music.mp3', true);

  const handleLinkClick = (path: string) => {
    playClick();
    navigate(path);
  };

  return (
    <PublicLayout>
      <div className="home-content">
        <h1 className="home-title">
          DESCUBRE TU ESPACIO DE <br /> ESTUDIO PERFECTO
        </h1>
        <p className="home-idea">
          💡 Elige tu amiguito ideal y transforma tu forma de estudiar
        </p>

        {/* Nombres de mascotas en lugar de imagen */}
        <div className="mascotas-texto">
          <span className="mascota-nombre-grande">CAT</span>
          <span className="mascota-nombre-grande">DOG</span>
          <span className="mascota-nombre-grande">FROG</span>
        </div>

        {/* Dos salas */}
        <div className="salas-row">
          <div className="sala-card" onClick={() => playClick()}>
            <img
              src="/assets/salas/salaestudio1.png"
              alt="Sala 1"
              className="sala-img"
            />
            <span className="sala-nombre">Sala A</span>
          </div>
          <div className="sala-card" onClick={() => playClick()}>
            <img
              src="/assets/salas/salaestudio2.png"
              alt="Sala 2"
              className="sala-img"
            />
            <span className="sala-nombre">Sala B</span>
          </div>
        </div>

        {/* Tarjetas informativas */}
        <div className="cards-row">
          <div className="info-card" onClick={() => playClick()}>
            <span className="card-text">Elige tu Mascota</span>
          </div>
          <div className="info-card" onClick={() => playClick()}>
            <span className="card-text">Personaliza tu Sala</span>
          </div>
        </div>

        <p className="home-footer-text">Tu sala, tus reglas, tus amigos.</p>
        <a
          href="/about"
          className="home-link"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/about');
          }}
        >
          Acerca de bitstudy
        </a>
      </div>
    </PublicLayout>
  );
};

export default HomePage;
