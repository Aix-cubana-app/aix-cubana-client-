import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FormContainer from "./FormContainer";
import { Col, Row, Spinner } from "react-bootstrap";

function UserBookings({ bookings, updateBookings }) {
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
        <> 
        <br /> <br /> <br />
        <Container>
          <Row className="justify-content-md-center">
            {bookings && bookings.length !== 0 ? (
              <>
                {bookings.map((booking) => {
                  return (
                    <Col xs={12} md={6} lg={4} mb={3}>
                      <Card key={booking._id} border="dark" style={myStyle}>
                        <Card.Header>{booking.location}</Card.Header>
                        <Card.Body>
                          <Card.Title>{booking.service?.title}</Card.Title>
                          <Card.Text>{booking.description}</Card.Text>
                          <Link to={`/booking/details/${booking._id}`}>
                            <Button variant="outline-dark">More Details</Button>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </>
            ) : (
              <h1>You have no bookings</h1>
            )}
          </Row>
        </Container>
        </>
      )}
    </>
  );
}

export default UserBookings;
