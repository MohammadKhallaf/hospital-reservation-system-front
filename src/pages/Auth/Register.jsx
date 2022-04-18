import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";

import toastify from "toastify-js";
import { Button, Col, Container, Form } from "react-bootstrap";

import AuthContext from "../../context/AuthContext";

const Register = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const SignUphandler = (e) => {
    e.preventDefault();

    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
    };

    axios
      .post("api/auth/new/", userData)
      .then((res) => {
        toastify({
          text: "Signed Up Successfully",
          duration: 3000,
        }).showToast();
        navigate(-1);
      })
      .catch((error) => {
        toastify({
          text: "An error occured",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #a71d31, #6b0f1a)",
          },
        }).showToast();
      });
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container className="p-5 w-50 border mt-5 shadow rounded">
      <h1 className="text-center fw-bolder">Register</h1>

      <Form onSubmit={SignUphandler}>
        <Form.Group className="mb-3" controlId="formUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            required
          />
          <Form.Text className="text-muted">Will use it for login</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 row" controlId="formUserName">
          <Col md>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="first_name"
              required
            />
          </Col>

          <Col md>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="last_name"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUserEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUserPass">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>

        <Button variant="primary" className="ms-auto" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
