import React, { createContext, useContext } from 'react';
import { useMusic } from '../hooks/useMusic'; // Apunta a tu hook actual

const MusicContext = createContext<ReturnType<typeof useMusic> | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const musicValue = useMusic(); // Inicializa el hook una sola vez a nivel global

  return (
    <MusicContext.Provider value={musicValue}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusicContext debe usarse dentro de un MusicProvider');
  return context;
};