import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoomPage } from './ui/pages/RoomPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Landing Page</div>} />
        <Route path="/login" element={<div>Login Falso</div>} />
        <Route
          path="/customization"
          element={<div>Customización Pixel Art</div>}
        />
        <Route path="/room" element={<RoomPage />} />{' '}
      </Routes>
    </Router>
  );
}

export default App;
