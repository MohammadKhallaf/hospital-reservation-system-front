import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import card from "../../assets/dentist.jpg";
const SpecGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [initial, setInitial] = useState(true);
  useEffect(() => {
    if (initial) {
      axios
        .get("http://localhost:8000/api/doctors/specializations")
        .then((e) => {
          setGallery(e.data);
        })
        .catch((e) => console.log(e));
      setInitial(false);
    }

    return () => {};
  }, [gallery]);

  return (
    <Container className="py-3">
      <h1>Specializations</h1>
      <Row xs={1} md={3} className="g-3">
        {gallery?.map((item, index, array) => (
          <Col key={`card-${index}`}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={card} />
              <Card.ImgOverlay>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Link to={`/list/${item.id}`}>
                  <Button variant="primary">Go somewhere</Button>
                </Link>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SpecGallery;
