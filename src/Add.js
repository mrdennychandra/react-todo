import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

function Add() {
  const { id } = useParams(); // Retrieve the id from the route if available
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState('');
  const [userId] = useState(1); // Static userId for this example
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch existing data for the todo if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title);
          setCompleted(data.completed);
        })
        .catch(error => console.error('Error fetching todo:', error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title) {
      setMessage('Please fill in both title and body.');
      return;
    }

    setLoading(true); // Show loading spinner

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id || ''}`, {
        method: id ? 'PUT' : 'POST', // Use PUT if id exists, otherwise POST
        body: JSON.stringify({
          id,
          title,
          completed,
          userId,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      const json = await response.json();
      console.log(json);

      setMessage(id ? 'Todo updated successfully!' : 'Todo added successfully!');
      if (!id) {
        setTitle('');
        setCompleted('');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(id ? 'Failed to update todo.' : 'Failed to add todo.');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  }

  function handleInputChange() {
    setMessage(''); // Reset the message when user starts typing
  }

  return (
    <div className="container">
      <h2 className="mb-4">{id ? 'Edit Todo' : 'Add Todo'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleInputChange();
            }}
            placeholder="Enter title"
            required
          />
        </Form.Group>

        <Form.Group controlId="completed" className="mb-3">
          <Form.Check 
            type="checkbox"
            label="Completed"
            checked={completed}
            onChange={(e) => {
              setCompleted(e.target.checked);
              handleInputChange();
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            id ? 'Update Todo' : 'Add Todo'
          )}
        </Button>
      </Form>

      {message && (
        <Alert variant={message.includes('success') ? 'success' : 'danger'} className="mt-3">
          {message}
        </Alert>
      )}
    </div>
  );
}

export default Add;