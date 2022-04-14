import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const SpecGallery = () => {
  return (
    <Container>
      <h1>Specializations</h1>
      <Row xs={1} md={3} className="g-3">
        {" "}
        {[
          "type 1",
          "type 2",
          "type 3",
          "type 1",
          "type 2",
          "type 3",
          "type 1",
          "type 2",
          "type 3",
        ].map((item, index, array) => (
          <Col key={`card-${index}`}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SpecGallery;
