import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { RiHeartPulseFill } from "react-icons/ri";

import AuthContext from "../../context/AuthContext";

import "./SiteNav.scss";

const SiteNav = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="sticky-top">
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
            {user?.is_staff ? (
              <>
                <NavLink to="/hospitalAdmin" className="text-decoration-none">
                  <Nav.Link as="span">Doctors Appointments</Nav.Link>
                </NavLink>
                <Nav.Link href={process.env.PUBLIC_URL + "admin"}>
                  Admin Site
                </Nav.Link>
              </>
            ) : null}

            <NavDropdown title="Account" id="basic-nav-dropdown">
              {user ? (
                <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
              ) : (
                <>
                  <NavLink to="login" className="text-decoration-none">
                    <NavDropdown.Item as="span">Login</NavDropdown.Item>
                  </NavLink>

                  <NavLink to="register" className="text-decoration-none">
                    <NavDropdown.Item as="span">Register</NavDropdown.Item>
                  </NavLink>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNav;
