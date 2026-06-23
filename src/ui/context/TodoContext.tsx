import React, { createContext, useContext } from 'react';
import { useTodoList } from '../hooks/useTodoList'; // Importamos TU hook tal cual lo tienes

// Le decimos a TypeScript que el contexto tendrá exactamente lo mismo que devuelve tu hook
type TodoContextType = ReturnType<typeof useTodoList>;

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Ejecutamos tu hook AQUÍ (reparará el localStorage una sola vez para toda la app)
  const todoListData = useTodoList(); 

  return (
    <TodoContext.Provider value={todoListData}>
      {children}
    </TodoContext.Provider>
  );
};

// Hook personalizado para usar el contexto de forma limpia
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodoContext debe usarse dentro de un TodoProvider');
  return context;
};