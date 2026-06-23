import React, { useState } from 'react';
import { useTodoList } from '../../hooks/useTodoList';
import { useSound } from '../../hooks/useSound';
import '../../styles/global.css';
import { userService } from '../../../config/dependencies';

const TASK_COLORS = ['#ff4444', '#33b5e5', '#00C851', '#ffbb33', '#aa66cc'];
const DIAS_SEMANA = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

interface Props {
  onClose: () => void;
}

export const TodoList: React.FC<Props> = ({ onClose }) => {
  // Conexión a Supabase (Mantenemos tu lógica intacta)
  const currentUser = userService.getCurrentUser();
  const userId = currentUser?.id;
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTodoList(userId);

  // Sonidos
  const playAdd = useSound('/assets/sounds/inputclick.mp3');
  const playToggle = useSound('/assets/sounds/button1.mp3');
  const playDelete = useSound('/assets/sounds/close.mp3');
  const playClear = useSound('/assets/sounds/button2.mp3');

  // Estados del calendario
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>(TASK_COLORS[0]);

  // Navegación del calendario
  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const currentMonthName = viewDate.toLocaleString('es-ES', { month: 'long' });
  const currentYear = viewDate.getFullYear();
  
  const daysInMonth = new Date(currentYear, viewDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, viewDate.getMonth(), 1).getDay();

  const blanksArray = Array.from({ length: firstDayIndex }, (_, i) => i);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleAddTask = () => {
    if (!newTaskText.trim() || !userId) return;
    playAdd();
    addTask(newTaskText);
    setNewTaskText('');
  };

  return (
    <div className="todo-modal-overlay">
      <div className="todo-modal">
        
        <h2 className="todo-header-title">CALENDARIO Y TAREAS</h2>

        <div className="todo-layout">
          {/* COLUMNA IZQUIERDA: CALENDARIO */}
          <div className="todo-column">
            <div className="month-nav">
              <button className="btn-nav" onClick={handlePrevMonth}>&lt;</button>
              <h3 className="column-title">
                {currentMonthName.toUpperCase()} {currentYear}
              </h3>
              <button className="btn-nav" onClick={handleNextMonth}>&gt;</button>
            </div>

            <div className="calendar-panel">
              <div className="weekdays-grid">
                {DIAS_SEMANA.map((dia, index) => (
                  <span key={index} className="weekday-label">{dia}</span>
                ))}
              </div>

              <div className="calendar-grid">
                {blanksArray.map((_, i) => (
                  <div key={`blank-${i}`} className="calendar-day-blank" />
                ))}

                {daysArray.map((day) => {
                  const fullDate = `${currentYear}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = selectedDate === fullDate;
                  
                  return (
                    <button
                      key={day}
                      className={`calendar-day ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedDate(fullDate)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: TAREAS */}
          <div className="todo-column">
            <h3 className="column-title" style={{ visibility: 'hidden' }}>TAREAS</h3>
            <div className="tasks-panel">
              
              <div className="color-picker">
                {TASK_COLORS.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>

              <div className="task-input-group">
                <input
                  type="text"
                  className="task-input"
                  placeholder={userId ? "Escribe una tarea..." : "Inicia sesión"}
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                  disabled={!userId}
                />
                <button 
                  className="btn-add" 
                  onClick={handleAddTask}
                  disabled={!userId}
                >
                  +
                </button>
              </div>

              <div className="tasks-list">
                {!userId ? (
                  <p className="empty-tasks">Inicia sesión para ver tus tareas</p>
                ) : tasks.length === 0 ? (
                  <p className="empty-tasks">¡No hay tareas pendientes!</p>
                ) : (
                  tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="task-item"
                      style={{ borderLeft: `4px solid ${selectedColor}` }}
                    >
                      <label className="task-label">
                        <input
                          type="checkbox"
                          className="todo-checkbox"
                          checked={task.completed}
                          onChange={() => {
                            playToggle();
                            toggleTask(task.id);
                          }}
                        />
                        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                          {task.text}
                        </span>
                      </label>
                      <button className="btn-delete" onClick={() => {
                        playDelete();
                        deleteTask(task.id);
                      }}>
                        X
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER RETRO CON BOTÓN CERRAR CENTRADO */}
        <div className="todo-footer">
          <button className="btn-close-modal" onClick={onClose}>
            X CERRAR
          </button>
          {tasks.some((t) => t.completed) && (
            <button 
              className="btn-close-modal" 
              onClick={() => { playClear(); clearCompleted(); }}
              style={{ backgroundColor: '#ff4444', marginLeft: '10px' }}
            >
              LIMPIAR
            </button>
          )}
        </div>

      </div>
    </div>
  );
};