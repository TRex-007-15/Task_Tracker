import React, { useState } from 'react';
import { Card, Button, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Filters from './Filters';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    assignee: '',
    priority: '',
    startDate: null,
    endDate: null,
  });
  const [sortBy, setSortBy] = useState('priority');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowForm(false); // Hide form after adding task
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setShowForm(false); // Hide form after editing task
    setSelectedTask(null); // Clear selected task
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEdit = (task) => {
    setSelectedTask(task); // Set the selected task for editing
    setShowForm(true); // Show the form for editing
  };

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const filteredTasks = tasks.filter((task) => {
    const { assignee, priority, startDate, endDate } = filters;
    return (
      (!assignee || task.assignee === assignee) &&
      (!priority || task.priority === priority) &&
      (!startDate || task.startDate >= new Date(startDate)) &&
      (!endDate || task.endDate <= new Date(endDate))
    );
  });

  return (
    <Card className="p-3" style={{ backgroundColor: '#f3e8f0' }}>
      <Card.Title className="mb-4">Task Board</Card.Title>
      <Row>
        <Col>
          <Filters onFilterChange={handleFilterChange} />
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowForm(true)}>Add Task</Button>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <DropdownButton id="dropdown-basic-button" title="Sort By">
            <Dropdown.Item onClick={() => handleSort('priority', 'asc')}>Priority (Low to High)</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('priority', 'desc')}>Priority (High to Low)</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('startDate', 'asc')}>Start Date (Old to New)</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('startDate', 'desc')}>Start Date (New to Old)</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          task={selectedTask} // Pass selectedTask for editing
          onCancel={() => {
            setShowForm(false); // Hide form on cancel
            setSelectedTask(null); // Reset selected task
          }}
        />
      )}
      <Row className="mt-4">
        {['Pending', 'In Progress', 'Completed', 'Deployed', 'Deferred'].map((status) => (
          <Col key={status}>
            <Card className="mb-4">
              <Card.Header className="bg-light">{status}</Card.Header>
              <Card.Body>
                <TaskList
                  tasks={filteredTasks.filter((task) => task.status === status)}
                  onEditTask={handleEdit} // Pass handleEdit function
                  onDeleteTask={handleDeleteTask} // Pass handleDeleteTask function
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default TaskBoard;
