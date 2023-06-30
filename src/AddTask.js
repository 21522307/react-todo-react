import { useState } from "react";

export default function AddTask({ onAddTask }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>Title:</label>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="What's the title of your To Do?"
        />
      </div>
      <div className="todo-input-item">
        <label>Description:</label>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="What's the description of your To Do?"
        />
      </div>
      <div className="todo-input-item">
        <button
          className="primary-btn"
          onClick={() => {
            setNewDescription("");
            setNewTodoTitle("");
            onAddTask({
              title: newTodoTitle,
              description: newDescription,
            });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
