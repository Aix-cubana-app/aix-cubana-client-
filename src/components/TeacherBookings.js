import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FormContainer from "./FormContainer";
import { Spinner } from "react-bootstrap";

function TeacherBookings({ bookings, updateBookings }) {
  const storedToken = localStorage.getItem("authToken");

  const myStyle = {
    margin: "2rem",

    width: "18rem",
  };

  useEffect(() => {
    updateBookings(storedToken);
  }, []);

  return (
    <>
    <br />
      {!bookings ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <FormContainer>
          {bookings && bookings.length !== 0 ? (
            <div>
              {bookings.map((booking) => {
                return (
                  <Card key={booking._id} border="dark" style={myStyle}>
                    <Card.Header>{booking.service?.title}</Card.Header>
                    <Card.Body>
                      <Card.Title>{booking.service?.style}</Card.Title>
                      <Card.Text>Level: {booking.service?.level}</Card.Text>
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
      )}
    </>
  );
}

export default TeacherBookings;
