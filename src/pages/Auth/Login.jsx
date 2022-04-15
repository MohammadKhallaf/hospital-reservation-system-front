import React, { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
const Login = () => {
  const { loginUser, user } = useContext(AuthContext);
  const login = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    loginUser(username, password);
  };
  return (
    <Container className="p-5">
      {user && <h1>LoggedIn</h1>}
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
