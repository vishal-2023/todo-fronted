import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  console.log('API URL:', API);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await fetch(`${API}/todos`);
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo(e) {
    e.preventDefault();

    if (!title.trim()) return;

    await fetch(`${API}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    setTitle('');
    fetchTodos();
  }

  async function toggle(todo) {
    await fetch(`${API}/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });

    fetchTodos();
  }

  async function remove(id) {
    await fetch(`${API}/todos/${id}`, {
      method: 'DELETE',
    });

    fetchTodos();
  }

  return (
    <div className="app">
      <h1>Todo App</h1>

      <form onSubmit={addTodo} className="add-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id} className={t.completed ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggle(t)}
              />
              <span>{t.title}</span>
            </label>

            <button onClick={() => remove(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}