import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  console.log('API URL:', API);

  useEffect(() => {
    fetchTodos().then(() => console.log('Todos fetched successfully')).catch
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
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7e7e7"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#333",
        }}
      >
        Todo App
      </h1>

      <form
        onSubmit={addTodo}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #eee",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggle(t)}
              />

              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  color: t.completed ? "#888" : "#000",
                }}
              >
                {t.title}
              </span>
            </label>

            <button
              onClick={() => remove(t.id)}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}