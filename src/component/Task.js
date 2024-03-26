import React from 'react';

const Task = ({ task, onDeleteTask, onEditTask }) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>Assignee: {task.assignee}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => onDeleteTask(task.title)}>Delete</button>
      <button onClick={() => onEditTask({ ...task, status: 'Completed' })}>Mark as Completed</button>
    </div>
  );
};

export default Task;
