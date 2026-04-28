import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import Customization from './ui/pages/Customization';
import LoginPage from './ui/pages/LoginPage';
import { RoomPage } from './ui/pages/RoomPage';
import { localStorageAdapter } from './adapters/localStorageAdapter';

function LoginWithRedirect() {
  const navigate = useNavigate();

  const handleLogin = (username: string) => {
    console.log('Usuario logueado:', username);
    localStorageAdapter.saveUser(username);
    navigate('/customization');
  };

  return <LoginPage onLogin={handleLogin} />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* lo mandamos al Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/*Pantalla de Login*/}
        <Route path="/login" element={<LoginWithRedirect />} />

        {/* Pantalla de Seleccion */}
        <Route path="/customization" element={<Customization />} />

        {/* Sala de Estudio*/}
        <Route path="/room" element={<RoomPage />} />
        {/*  si escriben cualquier cosa rara, al Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
