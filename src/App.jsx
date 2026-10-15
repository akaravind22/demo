import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  function addTask() {
    if (task.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false
      }
    ]);

    setTask("");
  }

  // Complete task
  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  // Delete task
  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  // Clear all tasks
  function clearAll() {
    setTasks([]);
  }

  return (
    <div className="container">
      <div className="todo-box">
        <h1>My To-Do List</h1>
        <p>Organize your daily tasks!</p>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button onClick={addTask}>Add</button>
        </div>

        <h3>Tasks: {tasks.length}</h3>

        <ul>
          {tasks.map((item) => (
            <li key={item.id}>
              <span
                onClick={() => toggleTask(item.id)}
                className={item.completed ? "completed" : ""}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />
                {item.text}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;