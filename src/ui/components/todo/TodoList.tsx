import React, { useState } from 'react';
import { useTodoList } from '../../hooks/useTodoList';
import { useSound } from '../../hooks/useSound';
import '../../styles/global.css';

// 1. Importamos el userService desde tus dependencias
import { userService } from '../../../config/dependencies'; 

export const TodoList: React.FC = () => {
  // 2. Obtenemos al usuario logueado usando el servicio de tu equipo
  const currentUser = userService.getCurrentUser();
  const userId = currentUser?.id;

  // 3. Le pasamos el ID a tu hook (que ya configuramos con fetch)
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTodoList(userId);

  const [inputValue, setInputValue] = useState('');

  const playAdd = useSound('/assets/sounds/inputclick.mp3');
  const playToggle = useSound('/assets/sounds/button1.mp3');
  const playDelete = useSound('/assets/sounds/close.mp3');
  const playClear = useSound('/assets/sounds/button2.mp3');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Si no hay usuario logueado, podríamos evitar que añada tareas
    if (inputValue.trim() && userId) { 
      playAdd();
      addTask(inputValue);
      setInputValue('');
    }
  };

  const handleToggleTask = (id: string) => {
    playToggle();
    toggleTask(id);
  };

  const handleDeleteTask = (id: string) => {
    playDelete();
    deleteTask(id);
  };

  const handleClearCompleted = () => {
    playClear();
    clearCompleted();
  };

  return (
    <div className="todo-panel">
      <h3 className="todo-section-title">MIS TAREAS</h3>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="Escribe una tarea..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!userId} // Opcional: deshabilitar si no hay usuario
          onKeyDown={(e) => e.stopPropagation()}
        />
        <button 
          type="submit" 
          className="todo-button-add"
          disabled={!userId}
        >
          AÑADIR
        </button>
      </form>

      <div className="todo-track-list">
        {!userId ? (
           <p className="todo-message">Inicia sesión para ver tus tareas</p>
        ) : tasks.length === 0 ? (
          <p className="todo-message">¡No hay tareas pendientes!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`todo-track-card ${task.completed ? 'todo-track-card--selected' : ''}`}
            >
              <div
                className="todo-item-left"
                onClick={() => handleToggleTask(task.id)}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="todo-checkbox"
                />
                <div className="todo-track-info">
                  <strong
                    className={task.completed ? 'todo-text--completed' : ''}
                  >
                    {task.text}
                  </strong>
                </div>
              </div>
              <button
                className="todo-button-delete"
                onClick={() => handleDeleteTask(task.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {tasks.some((t) => t.completed) && (
        <button className="todo-button-clear" onClick={handleClearCompleted}>
          LIMPIAR COMPLETADAS
        </button>
      )}
    </div>
  );
};