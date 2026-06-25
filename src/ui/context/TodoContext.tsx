import React, { createContext, useContext } from 'react';
import { useTodoList } from '../hooks/useTodoList'; 
// Importamos el userService para obtener el usuario activo
import { userService } from '../../config/dependencies';

type TodoContextType = ReturnType<typeof useTodoList>;

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  // Obtenemos el usuario actual del sistema de tu equipo
  const currentUser = userService.getCurrentUser();
  
  // Si no hay usuario logueado, pasamos un id de invitado temporal para que la app no falle
  const userId = currentUser?.id || 'guest_user';

  // Sincronizamos tu hook inyectándole el ID real
  const todoListData = useTodoList(userId);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <TodoContext.Provider value={todoListData}>
        {children}
      </TodoContext.Provider>
    </div>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext debe ser utilizado dentro de un TodoProvider');
  }
  return context;
};