'use client'

import React from 'react'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type Props = {
  todo: Todo
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
  return (
    <li
      className={`flex items-center justify-between p-2 border rounded ${
        todo.completed ? 'bg-green-100 line-through' : 'bg-white'
      }`}
    >
      <span
        className="flex-grow cursor-pointer"
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </li>
  )
}
