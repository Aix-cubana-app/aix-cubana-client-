
import { useEffect } from "react";
import { Link } from "react-router-dom";



function UserBookings({ bookings, updateBookings }){
    
    const storedToken = localStorage.getItem("authToken");
    
    

    // eslint-disable-next-line 
    useEffect( () => {
        updateBookings(storedToken);
    }, [] ) 

  

  
    

    

    return(
        <div className="container">
        { (bookings && bookings.length !== 0) 
        ?  
        <div>
        {bookings.map( (booking) => {

            
            return(
                <div key={booking._id}>
                <p>{booking.location}</p>
                <p>{booking.date} </p>                
                <p>{booking.description} </p>
                <Link to={`/booking/details/${booking._id}`}>
                    <button>More Details</button>
                </Link>  
                            
                

                </div>
                )
        })}

        </div>
        
        :
         <h1>You have no bookings</h1>
        }
            

        </div>
    )

    


}

export default UserBookings;