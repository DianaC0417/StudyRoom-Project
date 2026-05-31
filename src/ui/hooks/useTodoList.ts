import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const useTodoList = (userId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // Asegúrate de que este puerto coincida con el de tu backend 
  const API_URL = 'http://localhost:3000/api/tasks';

  // 1. OBTENER LAS TAREAS (GET)
  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return; // Si no hay usuario, no hacemos la petición
      
      try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        const data = await response.json();
        
        // Adaptamos los nombres de la base de datos (title, is_completed) 
        // a lo que espera tu interfaz (text, completed)
        const formattedTasks: Task[] = data.map((dbTask: any) => ({
          id: dbTask.id,
          text: dbTask.title,
          completed: dbTask.is_completed
        }));
        
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    fetchTasks();
  }, [userId]); // Este effect se vuelve a ejecutar si el userId cambia

  // 2. AÑADIR UNA TAREA (POST)
  const addTask = async (text: string) => {
    if (!text.trim() || !userId) return;
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, title: text.trim() }),
      });
      
      const dbTask = await response.json();
      
      const newTask: Task = {
        id: dbTask.id,
        text: dbTask.title,
        completed: dbTask.is_completed,
      };
      
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error al añadir la tarea:", error);
    }
  };

  // 3. CAMBIAR EL ESTADO (PATCH)
  const toggleTask = async (id: string) => {
    const taskToUpdate = tasks.find(t => t.id === id);
    if (!taskToUpdate) return;

    // Actualizamos la interfaz primero para que se sienta súper rápido al hacer clic
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));

    // Luego le avisamos a la base de datos en segundo plano
    try {
      await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed: !taskToUpdate.completed }),
      });
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  // 4. ELIMINAR UNA TAREA (DELETE)
  const deleteTask = async (id: string) => {
    // Actualizamos la interfaz al instante
    setTasks(tasks.filter((task) => task.id !== id));

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // 5. LIMPIAR TODAS LAS COMPLETADAS (DELETE Múltiple)
  const clearCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.completed);
    
    // Limpiamos la interfaz
    setTasks(tasks.filter((task) => !task.completed));

    // Ejecutamos un DELETE por cada tarea que estaba completada
    try {
      await Promise.all(
        completedTasks.map(task => 
          fetch(`${API_URL}/${task.id}`, { method: 'DELETE' })
        )
      );
    } catch (error) {
      console.error("Error al limpiar las tareas completadas:", error);
    }
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  };
};