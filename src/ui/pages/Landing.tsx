import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageAdapter } from '../../adapters/localStorageAdapter';
import './Landing.css';

export default function Landing() {
  const [userName, setUserName] = useState<string>('Estudiante');
  const [selectedCompanion, setSelectedCompanion] = useState<string>('cat');
  const [selectedRoom, setSelectedRoom] = useState<string>('classic');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorageAdapter.getUser();
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  const handleStart = () => {
    const finalName = userName.trim() === '' ? 'Estudiante' : userName;
    localStorageAdapter.saveUser(finalName);
    localStorageAdapter.saveAvatar({
      companion: selectedCompanion,
      room: selectedRoom,
    });
    navigate('/room');
  };

  const getCompanionSprite = () => {
    switch (selectedCompanion) {
      case 'cat': return '🐱';
      case 'frog': return '🐸';
      case 'dog': return '🐶';
      default: return '🐱';
    }
  };

  return (
    <div className="landing-container">
      <div className="customization-window">
        {/* Diorama (Left) */}
        <div className={`diorama-section room-bg-${selectedRoom}`}>
          <div className="speech-bubble">
            {userName.trim() === '' ? 'ESTUDIANTE' : userName}
          </div>
          <div className="character-sprite">
            {getCompanionSprite()}
          </div>
        </div>

        {/* Controls (Right) */}
        <div className="controls-section">
          {/* Module: Nombre */}
          <div className="control-module">
            <h2 className="module-title">TU NOMBRE</h2>
            <input 
              type="text" 
              className="pixel-input"
              value={userName}
              onFocus={() => {
                if (userName === 'Estudiante') {
                  setUserName('');
                }
              }}
              onBlur={() => {
                if (userName.trim() === '') {
                  setUserName('Estudiante');
                }
              }}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ej: Hero"
              maxLength={15}
            />
          </div>

          {/* Module: Compañero */}
          <div className="control-module">
            <h2 className="module-title">1. ELIGE TU COMPAÑERO</h2>
            <div className="options-grid">
              {['cat', 'frog', 'dog'].map((comp) => (
                <button 
                  key={comp}
                  className={`option-btn ${selectedCompanion === comp ? 'active' : ''}`}
                  onClick={() => setSelectedCompanion(comp)}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          {/* Module: Sala */}
          <div className="control-module">
            <h2 className="module-title">2. ELIGE TU SALA</h2>
            <div className="options-grid">
              {['classic', 'zen', 'nature'].map((room) => (
                <button 
                  key={room}
                  className={`option-btn ${selectedRoom === room ? 'active' : ''}`}
                  onClick={() => setSelectedRoom(room)}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button className="btn-start" onClick={handleStart}>
            ¡EMPEZAR A ESTUDIAR!
          </button>
        </div>
      </div>
    </div>
  );
}
