"use client";

import { useState } from "react";
import { Check, Trash2 } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Todo App
          </h1>
          <p className="text-gray-600 dark:text-gray-400 ">
            Stay organized and productive
          </p>
        </div>

        <form onSubmit={addTodo} className="mb-8 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-[family-name:var(--font-geist-sans)]"
          >
            Add
          </button>
        </form>

        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  todo.completed
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {todo.completed && <Check className="w-3 h-3 text-white" />}
              </button>
              <span
                className={`flex-1 text-gray-800 dark:text-gray-200 ${
                  todo.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none"
              >
                <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
              </button>
            </div>
          ))}
          {todos.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 font-[family-name:var(--font-geist-sans)]">
              No todos yet. Add one above!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
