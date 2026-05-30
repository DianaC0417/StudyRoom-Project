import { useState } from 'react';
import './TodoCalendarModal.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: string;
  color: string;
}

interface Props {
  onClose: () => void;
}

// Paleta de colores retro para las tareas
const TASK_COLORS = ['#ff4444', '#33b5e5', '#00C851', '#ffbb33', '#aa66cc'];

const TodoCalendarModal = ({ onClose }: Props) => {
  // Estado para el mes/año que estamos visualizando en el calendario
  const [viewDate, setViewDate] = useState<Date>(new Date());
  
  // Estado para el día exacto que seleccionamos
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>(TASK_COLORS[0]);

  // Lógica para cambiar de mes
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const currentMonthName = viewDate.toLocaleString('es-ES', { month: 'long' });
  const currentYear = viewDate.getFullYear();
  const daysInMonth = new Date(currentYear, viewDate.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      date: selectedDate,
      color: selectedColor, // Guardamos el color seleccionado
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filtrar tareas por la fecha seleccionada
  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  return (
    <div className="todo-modal-overlay">
      <div className="todo-modal">
        <h2 className="todo-header-title">CALENDARIO Y TAREAS</h2>

        <div className="todo-layout">
          {/* COLUMNA IZQUIERDA: CALENDARIO */}
          <div className="todo-column">
            {/* Controles de Navegación del Mes */}
            <div className="month-nav">
              <button className="btn-nav" onClick={handlePrevMonth}>&lt;</button>
              <h3 className="column-title">
                {currentMonthName.toUpperCase()} {currentYear}
              </h3>
              <button className="btn-nav" onClick={handleNextMonth}>&gt;</button>
            </div>

            <div className="calendar-panel">
              <div className="calendar-grid">
                {daysArray.map((day) => {
                  // Formatear la fecha para comparar
                  const fullDate = `${currentYear}-${String(
                    viewDate.getMonth() + 1
                  ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  
                  const isSelected = selectedDate === fullDate;
                  
                  // Buscar si hay tareas este día para mostrar los colores
                  const dayTasks = tasks.filter((t) => t.date === fullDate);
                  const uniqueColors = Array.from(new Set(dayTasks.map(t => t.color)));
                  
                  return (
                    <button
                      key={day}
                      className={`calendar-day ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedDate(fullDate)}
                    >
                      <span className="day-number">{day}</span>
                      
                      {/* Mostrar puntitos de colores si hay tareas */}
                      {uniqueColors.length > 0 && (
                        <div className="day-dots">
                          {uniqueColors.map((color, index) => (
                            <span 
                              key={index} 
                              className="task-dot" 
                              style={{ backgroundColor: color }}
                            ></span>
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: TAREAS */}
          <div className="todo-column">
            <h3 className="column-title" style={{ marginTop: '0.5rem' }}>TAREAS DEL DÍA</h3>
            <div className="tasks-panel">
              
              {/* Selector de Colores Retro */}
              <div className="color-picker">
                {TASK_COLORS.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title="Elegir color de tarea"
                  />
                ))}
              </div>

              <div className="task-input-group">
                <input
                  type="text"
                  className="task-input"
                  placeholder="Nueva tarea..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <button 
                  className="btn-add" 
                  onClick={handleAddTask}
                  style={{ color: selectedColor }} // El + se pone del color elegido
                >
                  +
                </button>
              </div>

              <div className="tasks-list">
                {filteredTasks.length === 0 ? (
                  <p className="empty-tasks">No hay tareas para hoy.</p>
                ) : (
                  filteredTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="task-item"
                      style={{ borderLeftColor: task.color }} // Borde izquierdo del color
                    >
                      <label className="task-label">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                        />
                        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                          {task.text}
                        </span>
                      </label>
                      <button className="btn-delete" onClick={() => deleteTask(task.id)}>
                        X
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="todo-footer">
          <button className="btn-close-modal" onClick={onClose}>
            X CERRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCalendarModal;