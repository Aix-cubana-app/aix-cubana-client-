import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";



function BookingDetails(){

    const storedToken = localStorage.getItem("authToken");

    const { id } = useParams();

    const [details, setDetails] = useState({});

    useEffect( () => {
        getBookingDetails(storedToken);

    }, [id] )

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
            <h3>Location: {details.location}</h3>
        </div>

    )

}

export default BookingDetails;