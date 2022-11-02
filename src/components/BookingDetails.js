import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";



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
                                       
            setDetails(BookingDetails.data)
        })
        .catch((err) => console.log("Problem getting the Booking from database" + err)
      );
        
    }

  



    return(
        <div className="container">
           
            <p>Location: {details.location} </p>
            <p>Date: {details.date} </p>            
            <p>Description: {details.description} </p>
            <p>Teacher: {details.teacher?.name}</p>
            
           
        </div>

    )

}

export default BookingDetails;