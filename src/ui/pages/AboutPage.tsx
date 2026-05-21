<<<<<<< HEAD
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
=======
>>>>>>> origin/main
import PublicLayout from '../components/PublicLayout';
import { Link } from 'react-router-dom';
import './NavPages.css';

const members = [
  'VALENTINA BRAVO',
  'HEIDY QUISPE',
  'NAOMI FLORES',
  'SOLEDAD VASQUEZ',
  'DIANA CONDORI',
  'ESTHER DAZA',
  'LAURA BERNAL',
  'DANIEL GUTIERREZ',
  'JOSE MARIA BAPTISTA',
];

<<<<<<< HEAD
const AboutPage = () => {
  useBackgroundMusic('/assets/sounds/background_music.mp3', true);

  return (
    <PublicLayout>
      <div className="about-content">
        {/* ===== VISIÓN ===== */}
        <h2 className="about-heading">NUESTRA VISIÓN</h2>
        <div className="about-row">
          <div className="about-text">
            <p>
              BitStudy nacio con la mision de fomentar la productividad
              estudiantil de manera acogedora y colaborativa. Queremos crear
              espacios de estudio virtuales donde los estudiantes se sientan
              motivados, junto a sus mascotas ideales, y puedan alcanzar sus
              metas sin sentirse solos. Creemos en la Interactividad y la
              comunidad.
            </p>
            <Link to="/join" className="about-join-btn">
              ¿QUIERES UNIRTE?
            </Link>
          </div>
          <div className="about-image">
            <img
              src="/assets/extras/arbol_vision.png"
              alt="Árbol de ideas creciendo sobre un libro"
              className="about-illustration"
            />
          </div>
        </div>

        {/* ===== NUESTRO EQUIPO ===== */}
        <h2 className="about-heading" id="equipo">
          NUESTRO EQUIPO
        </h2>
        <p className="about-equipo-desc">
          Detras de BitStudy se encuentra un equipo multidisciplinario y
          apasionado de Ingeniería Multimedia y Interactividad de la UCB,
          comprometido con la excelencia tecnica y la experiencia del usuario.
        </p>
        <div className="equipo-grid">
          {members.map((name, idx) => (
            <div className="member-card" key={idx}>
              <img
                src={`/assets/equipo/persona${idx + 1}.png`}
                alt={name}
                className="member-img"
              />
              <span className="member-name">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};
=======
const AboutPage = () => (
  <PublicLayout>
    <div className="about-content">
      {/* ===== VISIÓN ===== */}
      <h2 className="about-heading">NUESTRA VISIÓN</h2>
      <div className="about-row">
        <div className="about-text">
          <p>
            BitStudy nacio con la mision de fomentar la productividad
            estudiantil de manera acogedora y colaborativa. Queremos crear
            espacios de estudio virtuales donde los estudiantes se sientan
            motivados, junto a sus mascotas ideales, y puedan alcanzar sus metas
            sin sentirse solos. Creemos en la Interactividad y la comunidad.
          </p>
          <Link to="/join" className="about-join-btn">
            ¿QUIERES UNIRTE?
          </Link>
        </div>
        <div className="about-image">
          <img
            src="/assets/arbol_vision.png"
            alt="Árbol de ideas creciendo sobre un libro"
            className="about-illustration"
          />
        </div>
      </div>

      {/* ===== NUESTRO EQUIPO ===== */}
      <h2 className="about-heading" id="equipo">
        NUESTRO EQUIPO
      </h2>
      <p className="about-equipo-desc">
        Detras de BitStudy se encuentra un equipo multidisciplinario y
        apasionado de Ingeniería Multimedia y Interactividad de la UCB,
        comprometido con la excelencia tecnica y la experiencia del usuario.
      </p>
      <div className="equipo-grid">
        {members.map((name, idx) => (
          <div className="member-card" key={idx}>
            <img
              src={`/assets/equipo/persona${idx + 1}.png`}
              alt={name}
              className="member-img"
            />
            <span className="member-name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </PublicLayout>
);
>>>>>>> origin/main

export default AboutPage;
