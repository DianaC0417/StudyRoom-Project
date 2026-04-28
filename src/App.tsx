import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { RoomPage } from './ui/pages/RoomPage';
import LoginPage from './ui/pages/LoginPage';
import Customization from './ui/pages/Customization';

function LoginWithRedirect() {
  const navigate = useNavigate();

  const handleLogin = (username: string) => {
    console.log('Usuario logueado:', username);
    // Paso 2: Después del login, a elegir personaje
    navigate('/customization');
  };

  return <LoginPage onLogin={handleLogin} />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Redirección Inicial: Si alguien entra a la raíz, lo mandamos al Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 2. Pantalla de Login 1-bit */}
        <Route path="/login" element={<LoginWithRedirect />} />

        {/* 3. Pantalla de Selección (Nao) */}
        <Route path="/customization" element={<Customization />} />

        {/* 4. Tu Sala de Estudio (Phaser + Tu Arte) */}
        <Route path="/room" element={<RoomPage />} />
        {/* Ruta de seguridad: si escriben cualquier cosa rara, al Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
