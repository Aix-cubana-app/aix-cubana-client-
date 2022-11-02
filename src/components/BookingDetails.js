import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";



function BookingDetails(){

    const storedToken = localStorage.getItem("authToken");

    const { id } = useParams();

    const [details, setDetails] = useState({});

    useEffect( () => {
        getBookingDetails(storedToken);

    }, [] )

    const getBookingDetails = (token) => {

        axios.get(process.env.REACT_APP_API_URL + "/api/booking/details/" + id, { headers: { Authorization: `Bearer ${token}` } } ) 
        .then((BookingDetails) => {   
            console.log("BookingDetails data" + BookingDetails.data); 
                                       
            setDetails(BookingDetails.data)
        })
        .catch((err) => console.log("Problem getting the Booking from database" + err)
      );
        
    }

  



    return(
        <Container>
           
           <Card border="dark" style={{ width: "18rem" }}>
                <Card.Header>{details.location}</Card.Header>
                <Card.Body>
                  <Card.Title>{details.service?.title}</Card.Title>
                  <Card.Text>{details.description}</Card.Text>
                  <Card.Text>{details.date}</Card.Text>
                  <Card.Text>{details.owner?.name}</Card.Text>
                  <Card.Text>{details.teacher?.name}</Card.Text>

                  
                </Card.Body>
              </Card>
           
        </Container>

    )

}

export default BookingDetails;