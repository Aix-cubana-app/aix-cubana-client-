import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../context/auth.context";



function BookingDetails(){

    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext);

    const { id } = useParams();

    const [details, setDetails] = useState({});

    
  const myStyle = {
    margin: "2rem",  
    
    width: "18rem" 
  };

    useEffect( () => {
        getBookingDetails(storedToken);

    }, [] )

    const getBookingDetails = (token) => {

        axios.get(process.env.REACT_APP_API_URL + "/api/booking/" + id, { headers: { Authorization: `Bearer ${token}` } } ) 
        .then((BookingDetails) => {            
                                       
            setDetails(BookingDetails.data)
        })
        .catch((err) => console.log("Problem getting the Booking from database" + err)
      );
        
    }

    const deleteBooking = (token, bookingId) => {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/booking/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((deletedBooking) => {       
          navigate(-1);
        })
        .catch((err) =>
          console.log("Problem deleting the services from database" + err)
        );
    };

  



    return(
        <Container>
           
           <Card border="dark" style={myStyle}>
                <Card.Header>{details.service?.title}</Card.Header>
                <Card.Body>
                  <Card.Title>{details.service?.style}</Card.Title>
                  <Card.Text>Level: {details.service?.level}</Card.Text>
                  <Card.Text>Description: {details.description}</Card.Text>
                  <Card.Text>Date: {details.date}</Card.Text>
                  {user.isTeacher ? 
                  <>                  
                  <Card.Text>RequestedBy: {details.owner?.name}</Card.Text> 
                  <Card.Text>Teacher: {details.teacher?.name}</Card.Text>
                  </>
                  :  
                  <Card.Text>Teacher: {details.teacher?.name}</Card.Text>}
                  
                  
                  <Button onClick={ () => navigate(-1)} variant="outline-dark">Back</Button>
                  <Button onClick={ () => deleteBooking( storedToken, id )} variant="danger">Delete</Button>
                  
                  
                 

                  
                </Card.Body>
              </Card>
           
        </Container>

    )

}

export default BookingDetails;