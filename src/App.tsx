import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';

// Importaciones de la estructura del equipo
import Customization from './ui/pages/Customization';
import LoginPage from './ui/pages/LoginPage';
import { RoomPage } from './ui/pages/RoomPage';
import { userService } from './config/dependencies';

// Componente para manejar el redireccionamiento del Login
function LoginWithRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = userService.getCurrentUser();
    if (user) {
      navigate('/customization');
    }
  }, [navigate]);

  const handleLogin = (username: string) => {
    console.log('Usuario logueado:', username);
    navigate('/customization');
  };

  return <LoginPage onLogin={handleLogin} />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirección inicial al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas principales del proyecto integradas */}
        <Route path="/login" element={<LoginWithRedirect />} />
        <Route path="/customization" element={<Customization />} />
        
        {/* Aquí es donde vive tu Pomodoro corregido */}
        <Route path="/room" element={<RoomPage />} />
        
        {/* Manejo de rutas inexistentes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;