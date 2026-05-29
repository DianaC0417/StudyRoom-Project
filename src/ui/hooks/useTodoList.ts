import { useState, useEffect } from 'react';
import { todoService } from '../../config/dependencies';
import type { Task } from '../../domain/Task';

export type { Task };

export const useTodoList = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    return todoService.getTasks();
  });

  useEffect(() => {
    todoService.saveTasks(tasks);
  }, [tasks]);

  const addTask = (text: string) => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  };
};
