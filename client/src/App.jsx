import { useEffect, useState } from "react";

function Todo({ todo, updateTodo, deleteTodo }) {
  return (
    <div key={todo._id} className="todo">
      <p>{todo.todo}</p>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"}
        </button>
        <button
          className="todo__delete"
          onClick={() => deleteTodo(todo._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
    };

    getTodos();
  }, []);

  const updateTodo = async (todoId, todoStatus) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: todoStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (json.acknowledged) {
      setTodos((currentTodos) =>
        currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        })
      );
    }
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });
    const json = await res.json();

    if (json.acknowledged) {
      setTodos((currentTodos) =>
        currentTodos.filter((currentTodo) => currentTodo._id !== todoId)
      );
    }
  };

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
          ))}
      </div>
    </main>
  );
}
