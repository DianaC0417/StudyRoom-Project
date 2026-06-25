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
import HomePage from './ui/pages/HomePage';
import AboutPage from './ui/pages/AboutPage';
import JoinUsPage from './ui/pages/JoinUsPage';
import UserSettingsPage from './ui/pages/UserSettingsPage';
import StatisticsPage from './ui/pages/StatisticsPage';

import { studyConfigService } from './config/dependencies';
import type { StudyConfig } from './domain/StudyConfig';

import { TodoProvider } from './ui/context/TodoContext';
import { MusicProvider } from './ui/context/MusicContext';


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

      {/* Public pages */}
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/join" element={<JoinUsPage />} />

      {/* Private/user pages */}
      <Route
        path="/customization"
        element={
          <CustomizationPage onStart={handleStart} onLogout={handleLogout} />
        }
      />

      <Route
        path="/user-settings"
        element={<UserSettingsPage onLogout={handleLogout} />}
      />

      <Route
        path="/statistics"
        element={<StatisticsPage onLogout={handleLogout} />}
      />

      <Route path="/room" element={<RoomPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// Componente principal con persistencia para salas múltiples
function App() {
  return (
    <Router>
      {/* Colocamos los Providers aquí arriba. Gracias a esto, la música y las 
        tareas se quedan grabadas en la memoria global del navegador aunque 
        cambies de ruta, vayas a configuraciones, estadísticas o entres a 
        distintas salas de estudio.
      */}
      <TodoProvider>
        <MusicProvider>
          <AppRoutes />
        </MusicProvider>
      </TodoProvider>
    </Router>
  );
}

export default App;