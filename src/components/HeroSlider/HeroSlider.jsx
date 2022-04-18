import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./HeroSlider.scss";
import AuthContext from "../../context/AuthContext";
const HeroSlider = () => {
  const { user } = useContext(AuthContext);
  return (
    <Container
      as="section"
      fluid="fluid"
      className="hero-section  py-5 text-center"
    >
      <Row className="py-lg-5">
        <Col md={8} lg={6} className="mx-auto">
          <h1 className="fw-bolder ">Fountain Valley Hospital</h1>
          <p className="lead text-dark fs-4">
            We provide the best service and the experinced doctors
          </p>
          {user ? null : (
            <p className="pt-5 d-flex gap-5 justify-content-center align-items-center">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/login" className="text-muted">
                Register
              </Link>
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSlider;
