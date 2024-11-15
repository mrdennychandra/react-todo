import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home(){
  const [todos, settodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        settodos(response.data.slice(0, 10)); // Only take the first 100 items
      })
      .catch(error => console.error(error));
  }, []);

  function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    
    // If the user cancels, exit the function
    if (!confirmed) return;
  
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        settodos(todos.filter(todo => todo.id !== id));
        alert('Todo deleted successfully!');
      })
      .catch(error => console.error('Failed to delete todo:', error));
  }  

  function handleEdit(id){
    navigate(`/edit/${id}`);
  }

    return (
      <>
      <h1>List Of Todos</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr>
            <td>{todo.title}</td>
            <td>{todo.completed ? 'Completed' : 'Not Completed'}</td>
            <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(todo.id)}>Edit</Button>
                <Button variant="danger"  onClick={() => handleDelete(todo.id)}>Delete</Button>
              </td>
          </tr>
        ))}
      </tbody>
    </Table>
      </>
      
      );
}
export default Home;