// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';

import CustomizationPage from './ui/pages/Customization';
import LoginPage from './ui/pages/LoginPage';
import { RoomPage } from './ui/pages/RoomPage';
import { userService } from './config/dependencies';
import type { StudyConfig } from './domain/StudyConfig';

function LoginWithRedirect() {
  const navigate = useNavigate();

  // 👈 Verificar si ya hay sesión
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

function CustomizationWithRedirect() {
  const navigate = useNavigate();

  const handleStart = (config: StudyConfig) => {
    console.log('Configuración elegida:', config);
    // TODO: Guardar la configuración y navegar a la sala
    navigate('/room');
  };

  return <CustomizationPage onStart={handleStart} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginWithRedirect />} />
        <Route path="/customization" element={<CustomizationWithRedirect />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
