import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Corregimos la ruta según la nueva arquitectura hexagonal
import { usePomodoro } from './ui/hooks/usePomodoro';

// --- COMPONENTE DE TU SALA (Capa de UI) ---
const StudyRoom = () => {
  // Ahora usePomodoro usa Timestamps para no perder el tiempo al refrescar
  const { timeDisplay, isActive, toggleTimer, resetTimer, isBreak } = usePomodoro();

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>{isBreak ? '☕ Modo: Descanso' : '🍅 Modo: Enfoque'}</h1>
      
      <div style={{ fontSize: '8rem', fontWeight: 'bold', margin: '10px 0', fontVariantNumeric: 'tabular-nums' }}>
        {timeDisplay}
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button 
          onClick={toggleTimer} 
          style={{ padding: '15px 35px', fontSize: '1.2rem', cursor: 'pointer', backgroundColor: isActive ? '#ff9800' : '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', transition: '0.3s' }}
        >
          {isActive ? 'Pausar Sesión' : 'Iniciar Pomodoro'}
        </button>
        
        <button 
          onClick={resetTimer} 
          style={{ padding: '15px 35px', fontSize: '1.2rem', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '8px', transition: '0.3s' }}
        >
          Reiniciar
        </button>
      </div>

      <p style={{ marginTop: '40px', color: '#666', fontSize: '0.9rem' }}>
  Arquitectura Hexagonal: UI -&gt; Aplicación -&gt; Dominio
</p>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (Rutas de Diana) ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div style={{color: 'white', padding: '20px'}}>Página de Inicio (En construcción)</div>} />
        <Route path="/login" element={<div style={{color: 'white', padding: '20px'}}>Login Falso</div>} />
        <Route path="/customization" element={<div style={{color: 'white', padding: '20px'}}>Configuración de Avatar</div>} />
        {/* Tu ruta principal ya conectada al componente con lógica */}
        <Route path="/room" element={<StudyRoom />} />
      </Routes>
    </Router>
  );
}

export default App;