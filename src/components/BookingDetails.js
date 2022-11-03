import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../context/auth.context";



function BookingDetails(){

    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext);

    const { id } = useParams();

    const [details, setDetails] = useState({});

    useEffect( () => {
        getBookingDetails(storedToken);

    }, [] )

    const getBookingDetails = (token) => {

        axios.get(process.env.REACT_APP_API_URL + "/api/booking/details/" + id, { headers: { Authorization: `Bearer ${token}` } } ) 
        .then((BookingDetails) => {            
                                       
            setDetails(BookingDetails.data)
        })
        .catch((err) => console.log("Problem getting the Booking from database" + err)
      );
        
    }

  



    return(
        <Container>
           
           <Card border="dark" style={{ width: "18rem" }}>
                <Card.Header>{details.service?.title}</Card.Header>
                <Card.Body>
                  <Card.Title>{details.service?.style}</Card.Title>
                  <Card.Text>Description: {details.description}</Card.Text>
                  <Card.Text>Date: {details.date}</Card.Text>
                  {user.isTeacher ? 
                  <>
                  <Card.Text>RequestedBy: {details.owner?.name}</Card.Text> 
                  <Card.Text>Teacher: {details.teacher?.name}</Card.Text>
                  </>
                  :  
                  <Card.Text>Teacher: {details.teacher?.name}</Card.Text>}
                  <Link to={`/`}>
                    <Button variant="outline-dark">HomePage</Button>
                  </Link>
                  
                  
                 

                  
                </Card.Body>
              </Card>
           
        </Container>

    )

}

export default BookingDetails;