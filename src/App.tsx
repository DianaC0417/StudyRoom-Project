import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './ui/pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<div>Login Falso</div>} />
        <Route path="/customization" element={<div>Customización Pixel Art</div>} />
        <Route path="/room" element={<div>Sala de Estudio</div>} />
      </Routes>
    </Router>
  );
}

export default App;