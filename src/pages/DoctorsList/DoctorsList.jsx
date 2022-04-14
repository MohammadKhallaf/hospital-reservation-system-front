import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";
const DoctorsList = () => {
  const params = useParams();
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/doctors/specializations/" + params.listId)
      .then((e) => setDoctorList(e.data));
  }, []);

  return (
    <Container className="py-5">
      <h1>DoctorsList</h1>
      <Row className="g-3">
        {doctorList?.map((item, index, array) => (
          <Col xs={12} key={`doctor-${index}`} className="border">
            <Row>
              <Col xd={12} md={4}>
                <img
                  //!
                  //src={item.picture}
                  src={require("../../assets/dentist.jpg")}
                  className="img-fluid img-thumbnail float-start"
                  onError={(current) => {
                    current.target.src = require("../../assets/dentist.jpg");
                  }}
                  alt=""
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Col>

              <Col xd={12} md={8}>
                <h2>{item.name}</h2>
                <p className="fs-4">
                  <FaDollarSign />
                  {item.price} LE
                </p>
                <p className="fs-4">{item.experince}</p>
                <Button>Book</Button>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DoctorsList;
