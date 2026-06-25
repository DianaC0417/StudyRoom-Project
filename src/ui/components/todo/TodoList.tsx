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

  // 3. Consumimos directamente el hook con el ID del usuario activo
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } =
    useTodoList(userId);

  const [inputValue, setInputValue] = useState('');

  const playAdd = useSound('/assets/sounds/inputclick.mp3');
  const playToggle = useSound('/assets/sounds/button1.mp3');
  const playDelete = useSound('/assets/sounds/close.mp3');
  const playClear = useSound('/assets/sounds/button2.mp3');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && userId) {
      playAdd();
      addTask(inputValue.trim());
      setInputValue('');
    }
  };

  const handleToggleTask = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Evita rebotes de eventos en el árbol de Phaser/DOM
    playToggle();
    toggleTask(id);
  };

  const handleDeleteTask = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Evita activar el toggle de la tarea al intentar eliminarla
    playDelete();
    deleteTask(id);
  };

  const handleClearCompleted = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClear();
    clearCompleted();
  };

  return (
    <div className="todo-panel" onClick={(e) => e.stopPropagation()}>
      <h3 className="todo-section-title">MIS TAREAS</h3>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="Escribe una tarea..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!userId} 
          onKeyDown={(e) => e.stopPropagation()} // Previene interferencias con controles WASD del juego
        />
        <button type="submit" className="todo-button-add" disabled={!userId}>
          AÑADIR
        </button>
      </form>

      {/* Contenedor de la lista con scrollbar activo por CSS */}
      <div className="todo-track-list">
        {!userId ? (
          <p className="todo-message">Inicia sesión para ver tus tareas</p>
        ) : tasks.length === 0 ? (
          <p className="todo-message">¡No hay tareas pendientes!</p>
        ) : (
          tasks.map((task) => {
            // Evaluamos con seguridad estricta por elemento único
            const isCompleted = Boolean(task.completed);

            return (
              <div
                key={task.id}
                className={`todo-track-card ${isCompleted ? 'todo-track-card--selected' : ''}`}
                onClick={(e) => handleToggleTask(e, task.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="todo-item-left">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    readOnly
                    className="todo-checkbox"
                  />
                  <div className="todo-track-info">
                    <strong className={isCompleted ? 'todo-text--completed' : ''}>
                      {task.text || "Tarea sin texto"}
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="todo-button-delete"
                  onClick={(e) => handleDeleteTask(e, task.id)}
                >
                  ✕
                </button>
              </div>
            );
          })
        )}
      </div>

      {tasks.some((t) => t.completed) && (
        <button 
          type="button" 
          className="todo-button-clear" 
          onClick={handleClearCompleted}
        >
          LIMPIAR COMPLETADAS
        </button>
      )}
    </div>
  );
};