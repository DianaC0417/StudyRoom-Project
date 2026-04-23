/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudyRoom = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    // Recuperamos la configuración que guardamos en la página anterior
    const data = localStorage.getItem('user_study_config');
    
    if (data) {
      setConfig(JSON.parse(data));
    } else {
      // Si alguien intenta entrar a la sala sin configurarse, lo mandamos de vuelta
      navigate('/');
    }
  }, [navigate]);

  if (!config) return null;

  return (
    <div style={{ 
      backgroundColor: '#2c2c2c', 
      color: 'white', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'monospace'
    }}>
      <h1>SALA DE ESTUDIO</h1>
      
      <div style={{ border: '2px solid white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <p><strong>Estudiante:</strong> {config.nombre}</p>
        <p><strong>Compañero:</strong> {config.personaje}</p>
        <p><strong>Ambiente:</strong> {config.sala}</p>
        
        {/* Aquí es donde luego pondrás el arte de la sala y el personaje moviéndose */}
        <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#aaa' }}>
          [ El entorno de {config.sala} se está cargando... ]
        </div>
      </div>

      <button 
        onClick={() => navigate('/')}
        style={{ marginTop: '30px', cursor: 'pointer', padding: '10px 20px' }}
      >
        Volver a personalizar
      </button>
    </div>
  );
};

export default StudyRoom;