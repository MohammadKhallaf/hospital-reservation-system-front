import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import toastify from "toastify-js";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";

import AuthContext from "../../context/AuthContext";

const AdminBoard = () => {
  const { authTokens } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [data, setData] = useState([]);

  const selectDoctorHandler = (e) => {
    e.preventDefault();

    const doctor = e.target.doctor.value;
    const date = e.target.date.value;

    axios
      .post(
        `api/doctors/${doctor}/pdf/`,
        { date },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        toastify({
          text: "An error occured",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #a71d31, #6b0f1a)",
          },
        }).showToast();
      });
  };

  const getAppointments = (e) => {
    axios
      .get("api/doctors/appointments/" + e.target.value, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      })
      .then((res) => {
        const dates = res.data
          .map((item) => item.date)
          .filter((item, index, arr) => arr.indexOf(item) === index);
        setAppointments(dates);
      })
      .catch((e) =>
        toastify({
          text: "An error occured",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #a71d31, #6b0f1a)",
          },
        }).showToast()
      );
  };

  useEffect(() => {
    axios
      .get("api/doctors/")
      .then((res) => setDoctors(res.data))
      .catch((e) =>
        toastify({
          text: "An error occured",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #a71d31, #6b0f1a)",
          },
        }).showToast()
      );
  }, []);

  return (
    <Container className="pt-5">
      <Form onSubmit={selectDoctorHandler}>
        <Row className="py-3">
          <Col>
            <FloatingLabel label="Doctors">
              <Form.Select name="doctor" onChange={getAppointments} required>
                <option value="">Choose a doctor</option>
                {doctors?.map((item, index) => (
                  <option key={`doctor-${index}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Available Dates">
              <Form.Select name="date" required disabled={!appointments}>
                <option value="">Choose a date</option>
                {appointments?.map((item, index) => (
                  <option key={`date-${index}`} value={item}>
                    {item}
                    {console.log(item)}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button type="submit">Get Appointments</Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index, arr) => (
            <tr key={`appt-${index}`}>
              <td>{index + 1}</td>
              <td>{item.doctor.name}</td>
              <td>{item.patient.name}</td>
              <td>
                <time>{item.date}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminBoard;
