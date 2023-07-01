import { useReducer, useState } from "react";
import AddTask from "./AddTask.js";
import TaskList from "./TaskList.js";
import "./App.css";

let nextId = 0;
const initialTasks = [];

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      let newTasks = [
        ...tasks,
        {
          id: action.id,
          title: action.title,
          description: action.description,
          done: false,
        },
      ];

      return newTasks;
    }
    case "changed": {
      let newTasks = [...tasks];

      newTasks[newTasks.findIndex((t) => t.id === action.task.id)] =
        action.task;
      return newTasks;
    }
    case "deleted": {
      let newTasks = [...tasks];
      newTasks.splice(
        tasks.findIndex((t) => t.id === action.id),
        1
      );
      return newTasks;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [filter, setFilter] = useState("all");

  function handleAddTask(task) {
    dispatch({
      id: nextId++,
      type: "added",
      title: task.title,
      description: task.description,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  function handleFilterChange(filter) {
    setFilter(filter);
  }

  // Lọc các nhiệm vụ theo trạng thái đã chọn
  const filteredTasks = tasks.filter((task) => {
    if (filter === "todo") {
      return !task.done;
    } else if (filter === "completed") {
      return task.done;
    } else {
      return true;
    }
  });

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <AddTask onAddTask={handleAddTask} />

        <div className="btn-area">
          <button
            className={`secondary-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`secondary-btn ${filter === "todo" ? "active" : ""}`}
            onClick={() => handleFilterChange("todo")}
          >
            To Do
          </button>
          <button
            className={`secondary-btn ${
              filter === "completed" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
        </div>

        <TaskList
          tasks={filteredTasks} // Sử dụng danh sách đã lọc
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}
