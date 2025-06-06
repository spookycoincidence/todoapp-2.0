"use client";
import { useState, useEffect } from 'react';

// Definición del tipo Todo
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Cargar tareas del localStorage al inicio
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error('Error al cargar tareas:', e);
      }
    }
    
    // Detectar preferencia de tema del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Guardar tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Aplicar modo oscuro
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: task,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTask('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filtrar tareas según el filtro seleccionado
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-xl">📝</span> ToDo App
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="flex mb-6 gap-2">
            <input
              type="text"
              placeholder="Escribí una tarea..."
              className="flex-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition-all"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              Agregar
            </button>
          </div>

          {/* Filtros */}
          {todos.length > 0 && (
            <div className="flex justify-center mb-4 gap-2 text-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filter === 'active'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Activas
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filter === 'completed'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Completadas
              </button>
            </div>
          )}

          {todos.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400 fadeIn">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-lg font-medium mb-1">No hay tareas pendientes</p>
              <p className="text-sm">Agrega una nueva tarea para comenzar</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 fadeIn">
              <p className="text-lg">
                {filter === 'active' 
                  ? '¡Todas las tareas están completadas! 🎉' 
                  : 'No hay tareas completadas aún'}
              </p>
            </div>
          ) : (
            <ul className="space-y-2 mt-4">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex justify-between items-center p-4 rounded-lg border ${
                    todo.completed
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  } hover:shadow-md transition-all duration-200 slideIn`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => handleToggleTodo(todo.id)}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-400 dark:border-gray-500'
                      }`}
                    >
                      {todo.completed && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`flex-grow cursor-pointer ${
                        todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                      }`}
                      onClick={() => handleToggleTodo(todo.id)}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(todo.id)}
                    className="ml-2 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Eliminar tarea"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
              <span>
                {filteredTodos.length} {filteredTodos.length === 1 ? 'tarea' : 'tareas'} 
                {filter !== 'all' ? (filter === 'active' ? ' activas' : ' completadas') : ''}
              </span>
              
              {todos.some(todo => todo.completed) && (
                <button
                  onClick={clearCompleted}
                  className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                >
                  Limpiar completadas
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        Hecho con ❤️ usando Next.js y Tailwind CSS
      </p>
    </div>
  );
}