import { useState } from 'react';
import LoginPage from './pages/LoginPage';

function App() {
  const handleLogin = (username: string) => {
    console.log('Usuario logueado:', username);
    // Aquí navegas a la siguiente pantalla
    // navigate('/dashboard') si usas React Router
  };

  return <LoginPage onLogin={handleLogin} />;
}

export default App;