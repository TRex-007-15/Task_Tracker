// TaskItem.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const TaskItem = ({ task, onEditTask, onDeleteTask }) => {
  const handleEdit = () => {
    onEditTask(task);
  };

  const handleDelete = () => {
    onDeleteTask(task.title); // Pass task title for deletion
  };

  return (
    <Card className="task-item">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <Button variant="primary" onClick={handleEdit}>Edit</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
