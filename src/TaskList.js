import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

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
  const btnComponent = (
    <>
      <AiOutlineDelete
        title="Delete?"
        className="delete-icon"
        onClick={() => onDelete(task.id)}
      />
      <BsCheckLg
        title="Completed?"
        className=" check-icon"
        onClick={() => onChange({ ...task, done: !task.done })}
      />
    </>
  );
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
          {btnComponent}
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
          <AiOutlineEdit
            title="Edit?"
            className="edit-icon"
            onClick={() => setIsEditing(true)}
          />
          {btnComponent}
        </div>
      </>
    );
  }
  return <>{taskContent}</>;
}
