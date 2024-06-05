export default function Todo() {
    return (
      <div>Todo</div>
    )
  }

  export default function Todo() {
    return (
      <div key={todo._id} className="todo">
                <p>{todo.todo}</p>
                <div>
                  <button className="todo__status">
                    {(todo.status) ? "☑" : "☐"}
                  </button>
                </div>
              </div>
    )
  }