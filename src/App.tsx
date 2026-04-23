/* eslint-disable */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customization from './ui/pages/Customization';  
import StudyRoom from './ui/pages/StudyRoom'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Aquí le decimos que al abrir la página, cargue tu diseño */}
        <Route path="/" element={<Customization />} /> 
        <Route path="/study-room" element={<StudyRoom />} />
        <Route path="/login" element={<div>Página de Login</div>} />
      </Routes>
    </Router>
  );
}

export default App;