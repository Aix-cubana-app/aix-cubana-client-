import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FormContainer from "./FormContainer";

function ServiceEdit() {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  const { id } = useParams();

  const [details, setDetails] = useState({});

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    getServiceDetails(storedToken);
  }, []);

  const getServiceDetails = (token) => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/service/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((serviceDetails) => {
        setDetails(serviceDetails.data);
        setTitle(serviceDetails.data.title);
        setPrice(serviceDetails.data.price);
        setStyle(serviceDetails.data.style);
        setLevel(serviceDetails.data.level);
      })
      .catch((err) =>
        console.log("Problem getting the Booking from database" + err)
      );
  };

  const deleteService = (token, serviceId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/service/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((deletedService) => {       
        navigate(-1);
      })
      .catch((err) =>
        console.log("Problem deleting the services from database" + err)
      );
  };

  //Handling the form

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedService = {
      title,
      price,
      style,
      level,
      teacher: user._id,
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/service/${id}`,
        updatedService,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((service) => {
        navigate("/services");
      })
      .catch((err) => console.log("Problem creating a new Service" + err));
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} id="edit-service-form">
        <Form.Group className="mb-3">
          <Form.Label>Service Name:</Form.Label>
          <Form.Control
            size="sm"
            id="title-form"
            type="text"
            name="title"
            value={title}
            placeholder="Here the title"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            size="sm"
            id="price-form"
            type="number"
            name="price"
            value={price}
            required
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dancing Style:</Form.Label>
          <Form.Control
            size="sm"
            id="style-form"
            type="text"
            name="style"
            value={style}
            placeholder="The dancing style here"
            required
            onChange={(e) => {
              setStyle(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Select
          size="sm"
          aria-label="Choose a level"
          name="level"
          id="level-select"
          form="create-service-form"
          required
          onChange={(e) => {
            setLevel(e.target.value);
          }}
        >
          <option value="">Level</option>
          <option value="Beginner"> Beginner </option>
          <option value="Middle"> Middle</option>
          <option value="Advance"> Advance</option>
        </Form.Select>

        <Button variant="primary" type="submit">        
          UpdateService
        </Button>
        <Button onClick={ () => navigate(-1)} variant="outline-dark">Back</Button>
        <Button onClick={ () => deleteService( storedToken, id )} variant="danger">Delete</Button>
      </Form>
    </FormContainer>
  );
}

export default ServiceEdit;
