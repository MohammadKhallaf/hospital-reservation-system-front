import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Button, Container, Form } from "react-bootstrap";

import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { loginUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    loginUser(username, password);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container className="p-5 w-50 border mt-5 shadow rounded">
      <h1 className="text-center fw-bolder">Log In</h1>
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

        <Button
          variant="link"
          type="button"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
