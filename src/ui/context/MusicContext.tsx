import React, { createContext, useContext } from 'react';
// Importamos TU hook de música. 
// Ajusta la ruta '../hooks/useMusic' si tu archivo está en otra ubicación.
import { useMusic } from '../hooks/useMusic';

// Definimos el tipo del contexto basándonos en el retorno exacto de tu hook
type MusicContextType = ReturnType<typeof useMusic>;

// Creamos el contexto global
const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: React.ReactNode;
}

// Proveedor global que mantendrá el reproductor sonando de fondo
export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  // Inicializamos tu hook de música aquí arriba. 
  // Esto crea el objeto Audio() una sola vez para toda la aplicación.
  const musicData = useMusic();

  return (
    <MusicContext.Provider value={musicData}>
      {children}
    </MusicContext.Provider>
  );
};

// Hook personalizado para usar la música en cualquier componente (como tu MusicPanel)
export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext debe ser utilizado dentro de un MusicProvider');
  }
  return context;
};