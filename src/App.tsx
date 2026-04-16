import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './ui/pages/LoginPage';
import { userAdapter } from './adapters/userAdapter';

function LoginWithRedirect() {
  const navigate = useNavigate();

  const handleLogin = (username: string) => {
    console.log('Usuario logueado:', username);
    navigate('/room');
  };

  return <LoginPage onLogin={handleLogin} />;
}

function RoomPage() {
  const username = userAdapter.getUserId() ?? 'invitado';

  return (
    <div style={{ padding: '32px', textAlign: 'center' }}>
      <h1>Bienvenido a tu sala de estudio</h1>
      <p>Hola <strong>{username}</strong>, ya puedes comenzar.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginWithRedirect />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;