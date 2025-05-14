"use client";
import { useState, useEffect } from 'react'

export default function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<string[]>([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task])
      setTask('')
    }
  }

  const handleDeleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index)
    setTasks(updated)
  }

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-black text-zinc-800 dark:text-zinc-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            📝 ToDo App
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:scale-105 transition"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Escribí una tarea..."
            className="flex-1 p-3 rounded-l-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 outline-none"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r-lg transition"
          >
            Agregar
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-white dark:bg-zinc-800 rounded-xl shadow hover:scale-[1.01] transition-all duration-200 border border-zinc-200 dark:border-zinc-700"
            >
              <span>{task}</span>
              <button
                onClick={() => handleDeleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
