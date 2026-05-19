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
import HomePage from './ui/pages/HomePage';
import AboutPage from './ui/pages/AboutPage';
import JoinUsPage from './ui/pages/JoinUsPage';

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

  const handleLogout = () => {
    console.log('Regresando al login...');
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route
        path="/customization"
        element={<CustomizationPage onStart={handleStart} onLogout={handleLogout} />}
      />
      <Route path="/room" element={<RoomPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/join" element={<JoinUsPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;