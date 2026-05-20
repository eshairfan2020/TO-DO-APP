import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load todos
  useEffect(() => {
    const savedTodos = localStorage.getItem("myTodos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos
  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const handleAddTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: input,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInput("");
  };

  // Delete Todo
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Toggle Todo
  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    setTodos(updatedTodos);
  };

  // Filter Todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="todo-container">
        <h1>Todo Manager</h1>

        <div className="todo-input">
          <input
            type="text"
            placeholder="Add new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={handleAddTodo}>
            Add
          </button>
        </div>

        <div className="filters">
          <button onClick={() => setFilter("all")}>
            All
          </button>

          <button onClick={() => setFilter("completed")}>
            Completed
          </button>

          <button onClick={() => setFilter("pending")}>
            Pending
          </button>
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty">No tasks found</p>
          ) : (
            filteredTodos.map((todo) => (
              <div className="todo-card" key={todo.id}>
                <div
                  className={`todo-text ${
                    todo.completed ? "completed" : ""
                  }`}
                  onClick={() => handleToggle(todo.id)}
                >
                  {todo.title}
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
