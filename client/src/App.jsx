import React, { useState, useEffect } from "react";

function TodoList() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newTaskData = await response.json();
      setTasks([...tasks, newTaskData]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Enter new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
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

  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;
