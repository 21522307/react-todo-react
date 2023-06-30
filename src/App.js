import { useReducer } from "react";
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
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(task) {
    dispatch({
      id: ++nextId,
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
  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <AddTask onAddTask={handleAddTask} />

        <div className="btn-area">
          <button className="secondary-btn active">To Do</button>
          <button className="secondary-btn">Completed</button>
        </div>

        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}
