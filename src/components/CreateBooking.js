import axios from "axios";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

function CreateBooking({updateBookings}) {

  
  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const [teacherList, setTeacherList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState([]);
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");
  

  const navigate = useNavigate();

  useEffect(() => {
    getlistOfTeachers(storedToken);
    getlistOfServices(storedToken);
  }, [teacher]);

  const getlistOfTeachers = (token) => {
    axios
      .get(`${API_URL}/auth/users/teachers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((listOfTeacher) => {
        setTeacherList(listOfTeacher.data);
      })
      .catch((err) =>
        console.log("Problem getting the teachers from database" + err)
      );
  };

  const getlistOfServices = (token) => {
    axios
      .get(`${API_URL}/api/service/services/${teacher}`,
       { headers: { Authorization: `Bearer ${token}` },
      })
      .then((listOfServices) => {
        setServicesList(listOfServices.data);
      })
      .catch((err) =>
        console.log("Problem getting the teachers from database" + err)
      );
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const newBooking = {
        location,
        date,
        service,
        description,
        teacher,
        owner: user._id
    }

    axios.post(`${API_URL}/api/booking/create`, newBooking ,  { headers: { Authorization: `Bearer ${storedToken}`}} )
    .then( booking => {
        updateBookings(storedToken);
        navigate("/bookings/user")
    })
    .catch((err) =>
        console.log("Problem creating a new Booking" + err)
      );

  };

  return (
    <div className="container">
        
      <form id="create-booking-form" onSubmit={handleSubmit}>

        <div>
          <div>
            <label for="location-form">Location:</label>
          </div>

          <div>
            <input
              id="location-form"
              type="text"
              name="location"
              value={location}
              placeholder="City here"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <label for="date-form">Date</label>          
          <input
            id="date-form"
            type="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>

        <div>
          <label for="teacher-select">Choose a teacher:</label>

          <select
            name="teacher"
            id="teacher-select"
            form="create-booking-form"
            onChange={(e) => {
              setTeacher(e.target.value);
            }}
          >
            <option value="" selected>
              Select a teacher
            </option>
            {teacherList.map((teacher) => {
              return <option value={teacher._id}>{teacher.name}</option>;
            })}
          </select>
        </div>

        {teacher ? (
          <div>
            <label for="service-select">Choose a Service:</label>

            <select
              name="service"
              id="service-select"
              form="create-booking-form"
              onChange={(e) => {
                setService(e.target.value);
              }}
            >
              <option value="" selected>
                Select a service
              </option>
              {servicesList.map((service) => {
                return <option value={service._id}>{service.title}</option>;
              })}
            </select>
          </div>
        ) : (
          <p>You need to pick a teacher</p>
        )}
        

        <div>
          <div>
            <label for="textarea-form">Description:</label>
          </div>

          <div>
            <textarea
              id="textarea-form"
              type="text"
              name="description"
              value={description}
              placeholder="Here a short description of your rquest"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>

        <button>Create Booking</button>
      </form>
    </div>
  );
}

export default CreateBooking;
