import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FormContainer from "./FormContainer";

function TeacherBookings({ bookings, updateBookings }) {
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    updateBookings(storedToken);
  }, []);

  return (
    <FormContainer>
      {bookings && bookings.length !== 0 ? (
        <div>
          {bookings.map((booking) => {
            return (
              <Card key={booking._id} border="dark" style={{ width: "18rem" }}>
                <Card.Header>{booking.service.title}</Card.Header>
                <Card.Body>
                  <Card.Title>{booking.service.style}</Card.Title>
                  <Card.Text>Description: {booking.description}</Card.Text>
                  <Card.Text>Date: {booking.date}</Card.Text>
                  <Link to={`/booking/details/${booking._id}`}>
                    <Button variant="outline-dark">More Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <h1>You have no bookings</h1>
      )}
    </FormContainer>
  );
}

export default TeacherBookings;
