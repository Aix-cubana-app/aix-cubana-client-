import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function UserBookings({ bookings, updateBookings }) {
  const storedToken = localStorage.getItem("authToken");

  // eslint-disable-next-line
  useEffect(() => {
    updateBookings(storedToken);
  }, []);

  return (
    <Container>
      {bookings && bookings.length !== 0 ? (
        <>
          {bookings.map((booking) => {
            return (
              <Card key={booking._id} border="dark" style={{ width: "18rem" }}>
                <Card.Header>{booking.location}</Card.Header>
                <Card.Body>
                  <Card.Title>{booking.service.title}</Card.Title>
                  <Card.Text>{booking.description}</Card.Text>
                  <Link to={`/booking/details/${booking._id}`}>
                    <Button variant="outline-dark">More Details</Button>
                  </Link>
                </Card.Body>
              </Card>
             
            );
          })}
        </>
      ) : (
        <h1>You have no bookings</h1>
      )}
    </Container>
  );
}

export default UserBookings;
