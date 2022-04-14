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
          <Col xs={12} key={`doctor-${index}`} className="border" height="15rem">
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

              <Col xd={12} md={5}>
                <h2>{item.name}</h2>
                <p className="fs-4">
                  <FaDollarSign />
                  {item.price} LE
                </p>

                <p className="fs-4">{item.experince}</p>
                <Button>Book</Button>
              </Col>
              <Col xd={12} md={3} style={{height:"100%",overFlow:"hidden",}}>
                {item.doctor_schedules.map((item) => (
                  <Row className="py-3">
                    <Button>
                      <p>{item.day}</p>
                      <p>{item.time_from}</p>
                      <p>{item.time_to}</p>
                    </Button>
                  </Row>
                  
                ))}
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DoctorsList;
