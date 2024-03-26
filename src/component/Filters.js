import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Filters = ({ onFilterChange }) => {
  return (
    <Form>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="assignee">
            <Form.Label>Assignee</Form.Label>
            <Form.Control type="text" name="assignee" onChange={onFilterChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control as="select" name="priority" onChange={onFilterChange}>
              <option value="">All</option>
              <option value="P2">Low</option>
              <option value="P1">Medium</option>
              <option value="P0">High</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" name="startDate" onChange={onFilterChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" name="endDate" onChange={onFilterChange} />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
