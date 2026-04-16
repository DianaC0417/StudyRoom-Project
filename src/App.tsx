import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { usePomodoro } from './hooks/usePomodoro';

// --- COMPONENTE DE TU SALA (Tu lógica vive aquí) ---
const StudyRoom = () => {
  const { timeDisplay, isActive, toggleTimer, resetTimer, isBreak } = usePomodoro();

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>{isBreak ? '☕ Descanso' : '🍅 Tiempo de Enfoque'}</h1>
      <div style={{ fontSize: '6rem', fontWeight: 'bold', margin: '20px 0' }}>
        {timeDisplay}
      </div>
      <div>
        <button onClick={toggleTimer} style={{ padding: '10px 30px', fontSize: '1.5rem', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={resetTimer} style={{ padding: '10px 30px', fontSize: '1.5rem', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (La cancha de Diana) ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div style={{color: 'white'}}>Página de Inicio</div>} />
        <Route path="/login" element={<div style={{color: 'white'}}>Login Falso</div>} />
        <Route path="/customization" element={<div style={{color: 'white'}}>Customización Pixel Art</div>} />
        {/* AQUÍ CONECTAMOS TU LÓGICA A LA RUTA */}
        <Route path="/room" element={<StudyRoom />} />
      </Routes>
    </Router>
  );
}

export default App;