import "./App.css";
import Navbar from "./components/Navbar";

import SignupPage from "./components/Singup";
import LoginPage from "./components/Login";
import IsPrivate from "./components/IsPrivate";
import UserBookings from "./components/UserBookings";
import IsAnon from "./components/IsAnon";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import TeacherBookings from "./components/TeacherBookings";
import IsTeacher from "./components/isTeacher";
import CreateBooking from "./components/CreateBooking";
import BookingDetails from "./components/BookingDetails";
const API_URL = "http://localhost:5005";

function App() {

  const [ bookings, setBookings ] = useState([]); 



  

  const getBookings = (token) => {    

    axios
      .get(`${API_URL}/api/bookings`, { headers: { Authorization: `Bearer ${token}` } } )      
      .then((bookingsObj) => {        

        setBookings(bookingsObj.data);
        
      })
      .catch((err) =>
        console.log("Problem getting the bookings from database" + err)
      );
  };

  

  

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route  
          path="/"
          element={
            <Home />
          }
        />

        <Route
          path="/signup/"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

        <Route
          path="/login/"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/bookings/user"
          element={
            <IsPrivate>
              <UserBookings bookings={bookings.bookings} updateBookings={getBookings}  />
            </IsPrivate>
          }
        />
        <Route
          path="/bookings/teacher"
          element={
            <IsTeacher>
              <TeacherBookings bookings={bookings.teacherbookings} updateBookings={getBookings}  />
            </IsTeacher>
          }
        />
        <Route
          path="/bookings/create"
          element={
            <IsPrivate>
              <CreateBooking updateBookings={getBookings} />
            </IsPrivate>
          }
        />

        <Route path="/booking/details/:id" element={<BookingDetails />} />

      </Routes>
    </div>
  );
}

export default App;
