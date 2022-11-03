import axios from "axios";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function CreateBooking({ updateBookings }) {
  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const [teacherList, setTeacherList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState([]);
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getlistOfTeachers(storedToken);
  }, []);

  useEffect(() => {
    getlistOfServices(storedToken);
  }, [teacher]);

  const getlistOfTeachers = (token) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users/teachers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((listOfTeacher) => {
        setTeacherList(listOfTeacher.data);
      })
      .catch((err) =>
        console.log("Problem getting the teachers from database" + err)
      );
  };

  const getlistOfServices = (token) => {
    if (teacher) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/service/services/${teacher}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((listOfServices) => {
          setServicesList(listOfServices.data);
        })
        .catch((err) =>
          console.log("Problem getting the teachers from database" + err)
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      location,
      date,
      service,
      description,
      teacher,
      owner: user._id,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/booking/create`, newBooking, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((booking) => {
        updateBookings(storedToken);
        navigate("/bookings/user");
      })
      .catch((err) => console.log("Problem creating a new Booking" + err));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} id="create-booking-form">
        <Form.Group className="mb-3" >
          <Form.Label>Location:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="location"
            value={location}
            placeholder="City here"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Date:</Form.Label>
          <Form.Control
            size="sm"
            id="date-form"
            type="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Select
          size="sm"
          aria-label="Select a teacher"
          name="teacher"
          id="teacher-select"
          form="create-booking-form"
          onChange={(e) => {
            setTeacher(e.target.value);
          }}
        >
          <option value="">Teachers</option>
          {teacherList.map((teacher) => {
            return (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}{" "}
              </option>
            );
          })}
        </Form.Select>

        {teacher ? (
          <>
            <Form.Select
              size="sm"
              name="service"
              id="service-select"
              form="create-booking-form"
              onChange={(e) => {
                setService(e.target.value);
              }}
            >
              <option value="">Services</option>
              {servicesList.map((service) => {
                return (
                  <option key={service._id} value={service._id}>
                    {service.title}
                  </option>
                );
              })}
            </Form.Select>
          </>
        ) : (
          <p>You need to pick a teacher</p>
        )}

        <Form.Group className="mb-3" >
          <Form.Label>Description</Form.Label>
          <Form.Control
            size="sm"
            id="textarea-form"
            type="text"
            name="description"
            value={description}
            placeholder="Here a short description of your request"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          CreateBooking
        </Button>
      </Form>
    </Container>

   
  );
}

export default CreateBooking;
