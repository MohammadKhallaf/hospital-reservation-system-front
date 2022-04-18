import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./SpecGallery.scss";

const SpecGallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    axios
      .get("api/doctors/specializations/")
      .then((e) => {
        setGallery(e.data);
      })
      .catch((e) => console.log(e));

    return () => {};
  }, []);

  return (
    <Container className="py-3">
      <h1 className="py-3">Specializations</h1>
      <Row xs={1} sm={2} md={3} className="g-3">
        {gallery?.map((item, index, array) => (
          <Col key={`card-${index}`} className="spec-card">
            <Link
              to={`/list/${item.id}`}
              className="text-black text-decoration-none"
            >
              <Card className="border-0 border-start bg-secondary bg-gradient">
                <Card.Img
                  variant="top"
          
                  width="100%"
                  src={process.env.PUBLIC_URL + item.picture}
                  className="img-fluid float-start"
                  onError={(current) => {
                    current.target.src = require("../../assets/fallback/specialization.jpg");
                  }}
                  alt={`${item.name} specialization`}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SpecGallery;
