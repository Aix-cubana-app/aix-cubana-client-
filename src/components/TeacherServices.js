import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function TeacherServices({ bookings, updateBookings }) {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  const [services, setServices] = useState([]);

  // eslint-disable-next-line
  useEffect(() => {
    getServices(storedToken);
  }, []);

  const getServices = (token) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/service/services/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((servicesArr) => {

        setServices(servicesArr.data);

      })
      .catch((err) =>
        console.log("Problem getting the services from database" + err)
      );
  };

  

  return (
    <Container>
      {services && services.length !== 0 ? (
        <div>
          {services.map((service) => {
            return (


              <Card key={service._id} border="dark" style={{ width: "18rem" }}>
                <Card.Header>{service.title}</Card.Header>
                <Card.Body>
                  <Card.Title>{service.style}</Card.Title>
                  <Card.Text>Price: {service.price}</Card.Text>                  
                  <Card.Text>Style: {service.level}</Card.Text>
                  <Link to={`/service/edit/${service._id}`}>
                    <Button variant="outline-dark">Edit</Button>
                  </Link>
                </Card.Body>
              </Card>



            )





             
          })}
        </div>
      ) : (
        <h1>You have no services</h1>
      )}
    </Container>
  );
}

export default TeacherServices;
