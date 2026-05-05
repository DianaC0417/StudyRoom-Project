// ui/pages/Customization.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studyConfigService } from '../../config/dependencies'; // 👈 CAMBIO
import type { Character, Room } from '../../domain/StudyConfig';

const Customization = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [personaje, setPersonaje] = useState<Character>('gatito');
  const [sala, setSala] = useState<Room>('salaestudio1');

  const fondoUrl = '/custom/LandingBackground.png';
  const botonEmpezarUrl = '/custom/botonEmpezar.png';

  const personajeImg = `/custom/personajes/${personaje}preview.png`;
  const salaImg = `/custom/salas/${sala}preview.png`;

  const manejarEmpezar = () => {
    if (!nombre.trim()) {
      alert('¡No olvides poner tu Nickname!');
      return;
    }

    try {
      // 👈 USAMOS EL SERVICIO en lugar de localStorage directo
      studyConfigService.saveConfig({ nombre, personaje, sala });
      navigate('/room');
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Error al guardar configuración'
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          .pixel-character-container {
            animation: bounce 1.2s infinite ease-in-out;
          }
        `}
      </style>

      <img
        src={fondoUrl}
        alt="Fondo"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '32vh',
          left: '6.2vw',
          width: '34vw',
          height: '44vh',
          zIndex: 5,
          overflow: 'hidden',
        }}
      >
        <img
          src={salaImg}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        />

        <div
          className="pixel-character-container"
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '48%',
            width: '22%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '1rem',
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '1.5px',
              whiteSpace: 'nowrap',
              textShadow:
                '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
            }}
          >
            {nombre || '???'}
          </span>
          <img
            src={personajeImg}
            style={{ width: '100%', imageRendering: 'pixelated' }}
          />
        </div>
      </div>

      <div
        onClick={() => setPersonaje('gatito')}
        style={{
          position: 'absolute',
          top: '37vh',
          left: '46vw',
          width: '9vw',
          height: '20vh',
          cursor: 'pointer',
          zIndex: 20,
        }}
      />
      <div
        onClick={() => setPersonaje('ranita')}
        style={{
          position: 'absolute',
          top: '37vh',
          left: '56.5vw',
          width: '9vw',
          height: '20vh',
          cursor: 'pointer',
          zIndex: 20,
        }}
      />
      <div
        onClick={() => setPersonaje('perrito')}
        style={{
          position: 'absolute',
          top: '60.5vh',
          left: '51.3vw',
          width: '9vw',
          height: '20vh',
          cursor: 'pointer',
          zIndex: 20,
        }}
      />

      <div
        onClick={() => setSala('salaestudio1')}
        style={{
          position: 'absolute',
          top: '37vh',
          left: '72.6vw',
          width: '9vw',
          height: '20.5vh',
          cursor: 'pointer',
          zIndex: 20,
        }}
      />
      <div
        onClick={() => setSala('salaestudio2')}
        style={{
          position: 'absolute',
          top: '37vh',
          left: '83.2vw',
          width: '9vw',
          height: '20.5vh',
          cursor: 'pointer',
          zIndex: 20,
        }}
      />
      <div
        onClick={() => setSala('salaestudio3')}
        style={{
          position: 'absolute',
          top: '60.5vh',
          left: '78vw',
          width: '9vw',
          height: '20.5vh',
          cursor: 'pointer',
          zIndex: 20,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '5.8vh',
          left: '15.5vw',
          zIndex: 10,
        }}
      >
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nickname..."
          style={{
            border: '2px solid black',
            borderRadius: '8px',
            padding: '6px 60px',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            width: '220px',
            outline: 'none',
            backgroundColor: '#f0ede7',
            textAlign: 'center',
          }}
        />
      </div>

      <img
        src={botonEmpezarUrl}
        alt="Empezar"
        onClick={manejarEmpezar}
        style={{
          position: 'absolute',
          bottom: '6vh',
          right: '22vw',
          zIndex: 10,
          cursor: 'pointer',
          maxWidth: '280px',
          transition: 'transform 0.05s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
    </div>
  );
};

export default Customization;
