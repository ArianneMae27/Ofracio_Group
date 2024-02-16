import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Card, Container, Row, Col, Button, Modal, Image } from 'react-bootstrap';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userTodos, setUserTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserTodos = async (userId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
      setUserTodos(response.data);
      setShowModal(true);
    } catch (error) {
      console.error(`Error fetching todos for user ${userId}:`, error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserTodos([]);
  };

  return (
    <div>
      <Navbar />
      <h1>Users Page</h1>
      <Container>
        <Row>
          {users.map((user) => (
            <Col key={user.id} xs={12} sm={6} md={4} style={{ marginBottom: '20px' }}>
              <Card>
                {/* Replace the Card.Img with the Image component */}
                <Image
                  src={`https://i.pravatar.cc/150?u=${user.id}`}
                  alt={user.name}
                  roundedCircle
                  fluid
                />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Card.Text>{user.username}</Card.Text>
                  <Button onClick={() => fetchUserTodos(user.id)} variant="primary">
                    Show Todos
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Todos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {userTodos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
