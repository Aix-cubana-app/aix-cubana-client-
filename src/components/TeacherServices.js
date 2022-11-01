
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";



function TeacherServices({ bookings, updateBookings }){
    
    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext);

    
    
    const [services, setServices] = useState([]);
    

    // eslint-disable-next-line 
    useEffect( () => {
        getServices(storedToken);
    }, [] ) 


    const getServices = (token) => {    

        axios
          .get(`${process.env.REACT_APP_API_URL}/api/service/services/${user._id}`, { headers: { Authorization: `Bearer ${token}` } } )      
          .then((servicesArr) => {        
    
            setServices(servicesArr.data);
            
          })
          .catch((err) =>
            console.log("Problem getting the services from database" + err)
          );
      };

  

  
    

    

    return(
        <div className="container">
        { (services && services.length !== 0) 
        ?  
        <div>
        {services.map( (service) => {

            
            return(
                <div>
                <p>{service.title}</p>
                <p>{service.price} </p>                
                <p>{service.style} </p>
                <p>{service.level} </p>                        
               
                            
                

                </div>
                )
        })}

        </div>
        
        :
         <h1>You have no services</h1>
        }
            

        </div>
    )

    


}

export default TeacherServices;