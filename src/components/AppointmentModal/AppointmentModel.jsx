import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { BsCalendarDateFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./AppointmentModel.scss";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import toastify from "toastify-js";

const AppointmentModel = ({ data: { name, id }, ...props }) => {
  const { authTokens } = useContext(AuthContext);
  const dateTimeRef = useRef();
  const [load, setLoad] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const DateTimeValue = e.target.bookingTime.value;
    const date = dayjs(DateTimeValue).format("YYYY-MM-DD");
    const time = dayjs(DateTimeValue).format("HH:MM");
    const doctor = id;
    setLoad(true);
    axios
      .post(
        "api/patients/appointments/create/",
        {
          doctor,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
      )
      .then((res) => {
        setLoad(false);
        props.onHide();

        toastify({
          text: "Appointment Booked successfully",

          duration: 3000,
        }).showToast();
      })
      .catch((err) => {
        setLoad(false);
        toastify({
          text: "An error occured",
          style: {
            background: "linear-gradient(315deg, #3f0d12 0%, #6b0f1a 74%)",
          },
          duration: 3000,
        }).showToast();
      });
  };

  useEffect(() => {
    if (props.show) dateTimeRef.current.focus();
  }, [props.show]);

  return (
    <>
      <Modal {...props} backdrop="static" keyboard={false} className="fade">
        <Modal.Header closeButton>
          <Modal.Title>Book an appointment</Modal.Title>
        </Modal.Header>
        <Form
          className="container row "
          onSubmit={handleSubmit}
          id="bookingForm"
        >
          <Modal.Body>
            <p className="text-muted fs-5 lead">Dr. {name}</p>
            <Form.Label htmlFor="dateTimeField">
              Choose the suitable date and time
            </Form.Label>
            <InputGroup className="pt-3 ps-3 row">
              <div className="d-flex justify-content-center align-items-center  gap-3">
                <BsCalendarDateFill className="form-icon text-info fs-3" />
                <Form.Control
                  type="datetime-local"
                  id="dateTimeField"
                  ref={dateTimeRef}
                  min={dayjs().format("YYYY-MM-DDTHH:mm")}
                  // value={dayjs().format("YYYY-MM-DDTHH:mm")}
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                  name="bookingTime"
                  required
                />
              </div>
              <Form.Text className="text-muted">
                Format: YYYY-MM-DD HH:mm (AM/PM)
              </Form.Text>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="link"
              className="text-muted"
              onClick={props.onHide}
            >
              Close
            </Button>
            {authTokens ? (
              <Button variant="primary" type="submit" disabled={load}>
                Confirm
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="primary" type="button" disabled={load}>
                  Login to proceed
                </Button>
              </Link>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AppointmentModel;
