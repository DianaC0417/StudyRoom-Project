// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';

import Customization from './ui/pages/Customization';
import LoginPage from './ui/pages/LoginPage';
import { RoomPage } from './ui/pages/RoomPage';
import { userService } from './config/dependencies'; // 👈 CAMBIO

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginWithRedirect />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
