import axios from "axios";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Row, Stack } from "react-bootstrap";

function CreateService() {
  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = {
      title,
      price,
      style,
      level,
      teacher: user._id,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api//service/`,
        newService,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((service) => {
        navigate("/services");
      })
      .catch((err) => console.log("Problem creating a new Service" + err));
  };

  return (
    <Container>

      <h3>Create a Service</h3>
      <Form onSubmit={handleSubmit} id="create-service-form">
        
        <Form.Group className="mb-3" >
          <Stack direction="horizontal" gap={2}>
          <Form.Label md={4}>Service:</Form.Label>
          <Form.Control
            md={8}
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

          </Stack>
        </Form.Group>

        <Form.Group className="mb-3" >
        <Stack direction="horizontal">
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
        </Stack>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Stack direction="horizontal">
          <Form.Label>Style:</Form.Label>
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
          </Stack>
        </Form.Group>

        <Stack direction="horizontal" gap={2}> 
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
          CreateService
        </Button>
        <Button onClick={ () => navigate(-1)} variant="outline-dark">Back</Button>
          </Stack>
      </Form>
    </Container>   
  );
}

export default CreateService;
