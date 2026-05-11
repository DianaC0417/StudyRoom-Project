// App.tsx - Versión corregida para Opción 1
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import CustomizationPage from './ui/pages/Customization';
import LoginPage from './ui/pages/LoginPage';
import { RoomPage } from './ui/pages/RoomPage';
import { studyConfigService } from './config/dependencies';
import type { StudyConfig } from './domain/StudyConfig';

// Componente separado para usar useNavigate
function AppRoutes() {
  const navigate = useNavigate();

  const handleStart = (config: StudyConfig) => {
    console.log('Guardando configuración:', config);
    studyConfigService.saveConfig(config);
    navigate('/room', { state: config });
  };

  const handleLogin = (username: string) => {
    console.log('Usuario logueado:', username);
    navigate('/customization');
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route
        path="/customization"
        element={<CustomizationPage onStart={handleStart} />}
      />
      <Route path="/room" element={<RoomPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// Componente principal sin useNavigate directamente
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
