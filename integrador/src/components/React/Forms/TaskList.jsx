import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Función para agregar una nueva tarea
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Simulación de recepción de nueva tarea desde un formulario
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'newTask') {
        const newTask = JSON.parse(event.newValue);
        addTask(newTask);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [tasks]);

  return (
    <div className="bg-white w-full max-w-md p-8 rounded shadow-lg border border-purple-900 mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-purple-900">Tareas Pendientes</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No hay tareas pendientes. <br /> Ingrese una tarea para empezar</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="mb-4 p-4 border rounded shadow-sm">
              <h3 className="font-semibold text-purple-900">{task.materia}</h3>
              <p><strong>Descripción:</strong> {task.descripcion}</p>
              <p><strong>Relevancia:</strong> {task.relevancia}</p>
              <p><strong>Entrega:</strong> {task.entrega}</p>
              <p><strong>Recordatorio:</strong> {task.estimacion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { TaskList };
