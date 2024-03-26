// TaskForm.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const TaskForm = ({ task, onAddTask, onEditTask, onCancel }) => {
  const [formData, setFormData] = useState({ title: '', description: '', assignee: '', status: 'Pending', priority: 'P0' });
  const [readOnlyFields, setReadOnlyFields] = useState(true);

  useEffect(() => {
    if (task) {
      const { title, description, assignee, status, priority } = task;
      setFormData({ title, description, assignee, status, priority });
      setReadOnlyFields(true);
    } else {
      setFormData({ title: '', description: '', assignee: '', status: 'Pending', priority: 'P0' });
      setReadOnlyFields(false);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      onAddTask(formData);
    } else {
      const { status, priority } = formData;
      onEditTask({ ...task, status, priority });
    }
    setFormData({ title: '', description: '', assignee: '', status: 'Pending', priority: 'P0' });
    onCancel();
  };

  return (
    <Modal show={true} onHide={onCancel} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" required readOnly={readOnlyFields} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" required readOnly={readOnlyFields} />
          </Form.Group>
          <Form.Group controlId="assignee">
            <Form.Label>Assignee</Form.Label>
            <Form.Control type="text" name="assignee" value={formData.assignee} onChange={handleChange} readOnly={readOnlyFields} />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" name="status" value={formData.status} onChange={handleChange} readOnly={readOnlyFields}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Deployed">Deployed</option>
              <option value="Deferred">Deferred</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control as="select" name="priority" value={formData.priority} onChange={handleChange} readOnly={readOnlyFields}>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">{task ? 'Edit Task' : 'Add Task'}</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
