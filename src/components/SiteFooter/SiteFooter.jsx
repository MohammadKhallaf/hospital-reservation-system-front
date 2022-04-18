import React from "react";
import dayjs from "dayjs";

import { Container, Row } from "react-bootstrap";

const SiteFooter = () => {
  return (
    <Container className="pt-5 mt-5">
      <Row
        as="footer"
        className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
      >
        <p className="col-md-4 mb-0 text-muted">
          All rights reserved &copy; {dayjs().year()}
        </p>
        <a
          href="https://www.linkedin.com/in/mohammedkhallaf/"
          target="_blank"
          rel="noreferrer"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          Contact me
        </a>
      </Row>
    </Container>
  );
};

export default SiteFooter;
