import React, { useEffect, useState } from "react";

function Todo({ todo, updateTodo, deleteTodo }) {
  return (
    <div className="todo">
      <p>{todo.todo}</p>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"}
        </button>
        <button className="todo__delete" onClick={() => deleteTodo(todo._id)}>
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
      try {
        const res = await fetch("/api/todos");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const todos = await res.json();
        setTodos(todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    getTodos();
  }, []);

  const updateTodo = async (todoId, todoStatus) => {
    try {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ status: !todoStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
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
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      if (json.acknowledged) {
        setTodos((currentTodos) =>
          currentTodos.filter((currentTodo) => currentTodo._id !== todoId)
        );
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
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
