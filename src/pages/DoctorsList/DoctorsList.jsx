import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import toastify from "toastify-js";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FcClock, FcMoneyTransfer } from "react-icons/fc";

import AppointmentModel from "../../components/AppointmentModal/AppointmentModel";

import "./DoctorList.scss";

const DoctorsList = () => {
  const [modalState, setModalState] = useState({ show: false, data: {} });
  const [doctorList, setDoctorList] = useState([]);
  const [header, setHeader] = useState("No Doctors Available Yet");

  const params = useParams();

  const Dayjs = dayjs;
  Dayjs.extend(customParseFormat);

  useEffect(() => {
    axios
      .get("api/doctors/specializations/" + params.listId)
      .then((e) => {
        setDoctorList(e.data);
        setHeader(e.data[0].specialization.name);
      })
      .catch(() => {
        toastify({
          text: "An error occured",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #a71d31, #6b0f1a)",
          },
        }).showToast();
      });
  }, [params.listId]);

  return (
    <Container className="py-5">
      <AppointmentModel
        data={modalState.data}
        show={modalState.show}
        onHide={() => setModalState({ ...modalState, show: false })}
      />

      <h1>{header}</h1>

      <Row className="gap-3 p-3">
        {doctorList?.map((item, index, array) => (
          <Col
            xs={12}
            sm={11}
            key={`doctor-${index}`}
            className="row doctor-card border p-3"
            style={{ minHeight: "10rem" }}
          >
            <Col className="d-flex justify-content-center">
              <img
                src={process.env.PUBLIC_URL + item.picture}
                className="img-fluid float-start"
                onError={(current) => {
                  current.target.src =
                    item.gender === "female"
                      ? require("../../assets/fallback/female-doctor.jpg")
                      : require("../../assets/fallback/male-doctor.jpg");
                }}
                alt="doctor"
              />
            </Col>

            <Col xs={12} md={5} className="p-3">
              <h2 className="fw-bolder">{item.name}</h2>
              <h3>{item.specialization.name}</h3>
              <p className="fs-5 lead text-muted">{item.experience}</p>
              <p className="fs-5 d-flex flex-row align-items-center text-success">
                <FcMoneyTransfer className="me-3 align-baseline" />
                {item.fees} LE
              </p>
              <time className="fs-6 d-flex flex-row align-items-center">
                <FcClock className="me-3" />
                {Dayjs(item.arrival_time, "HH:mm:ss").format("hh:mm A")}
              </time>
            </Col>

            <Col
              xd={12}
              md={3}
              className=" d-flex align-items-end justify-content-end p-3"
            >
              <Button
                variant="primary"
                className="btn-lg"
                onClick={() => setModalState({ show: true, data: item })}
              >
                Book
              </Button>
            </Col>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DoctorsList;
