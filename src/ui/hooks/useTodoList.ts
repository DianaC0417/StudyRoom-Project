// src/ui/hooks/useTodoList.ts
import { useState, useEffect } from 'react';
import type { Task } from '../../domain/Task';
import { taskService } from '../../config/dependencies';

export const useTodoList = (userId: string = 'guest_user') => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;
      try {
        const userTasks = await taskService.getTasksByUser(userId);
        setTasks(userTasks);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    };
    fetchTasks();
  }, [userId]);

  const addTask = async (text: string) => {
    if (!text.trim() || !userId) return;
    try {
      const newTask = await taskService.createTask(userId, text);
      // Usamos callback para evitar problemas de cierres en entornos asíncronos
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error('Error al añadir la tarea:', error);
    }
  };

  const toggleTask = async (id: string) => {
    const taskToUpdate = tasks.find((t) => t.id === id);
    if (!taskToUpdate) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      await taskService.updateTaskStatus(id, !taskToUpdate.completed);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    try {
      await taskService.deleteTask(id);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const clearCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.completed);
    setTasks((prev) => prev.filter((task) => !task.completed));

    try {
      await Promise.all(
        completedTasks.map((task) => taskService.deleteTask(task.id))
      );
    } catch (error) {
      console.error('Error al limpiar las tareas completadas:', error);
    }
  };

  return { tasks, addTask, toggleTask, deleteTask, clearCompleted };
};