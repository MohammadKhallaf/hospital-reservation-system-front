import React, { useContext } from "react";
import { RiHeartPulseFill } from "react-icons/ri";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

import "./SiteNav.scss";
import AuthContext from "../../context/AuthContext";
const SiteNav = () => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Link to="/" className="text-decoration-none">
          <Navbar.Brand
            as="span"
            className="d-flex justify-content-center align-items-center text-light fs-4 "
          >
            <RiHeartPulseFill className="text-info" />
            <span className="fw-bold ps-2 ">Fountain Valley</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="rounded text-info"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <NavLink to="/" className="text-decoration-none">
              <Nav.Link as="span">Home</Nav.Link>
            </NavLink>
            <Nav.Link>Link</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavLink to="login" className="text-decoration-none">
                <NavDropdown.Item as="span">Login</NavDropdown.Item>
              </NavLink>
              <NavLink to="register" className="text-decoration-none">
                <NavDropdown.Item as="span">Register</NavDropdown.Item>
              </NavLink>

              <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNav;
