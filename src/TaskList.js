import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { BsCheckLg, BsCheck2Circle } from "react-icons/bs";

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <div key={task.id} className="todo-item">
          <Task
            key={task.id}
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </div>
      ))}
    </div>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <div className="item-edit">
          <input
            value={task.title}
            onChange={(e) => {
              onChange({
                ...task,
                title: e.target.value,
              });
            }}
          />
          <input
            value={task.description}
            onChange={(e) => {
              onChange({
                ...task,
                description: e.target.value,
              });
            }}
          />
        </div>

        <div>
          <AiOutlineSave
            className="edit-icon"
            onClick={() => setIsEditing(false)}
          />
          <AiOutlineDelete
            title="Delete?"
            className="delete-icon"
            onClick={() => onDelete(task.id)}
          />
        </div>
      </>
    );
  } else {
    taskContent = (
      <>
        <div className="item-content">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <div>
          <AiOutlineDelete
            title="Delete?"
            className="delete-icon"
            onClick={() => onDelete(task.id)}
          />
          {task.done ? (
            <BsCheck2Circle
              title="UnCompleted?"
              className=" check-icon"
              onClick={() => {
                onChange({ ...task, done: !task.done });
              }}
            />
          ) : (
            <>
              <AiOutlineEdit
                title="Edit?"
                className="edit-icon"
                onClick={() => setIsEditing(true)}
              />
              <BsCheckLg
                title="Completed?"
                className=" check-icon"
                onClick={() => {
                  onChange({ ...task, done: !task.done });
                }}
              />
            </>
          )}
        </div>
      </>
    );
  }
  return <>{taskContent}</>;
}
