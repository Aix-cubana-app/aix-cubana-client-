import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from "./components/Singup";
import LoginPage from "./components/Login";
import IsPrivate from "./components/IsPrivate";
import UserBookings from "./components/UserBookings";
import IsAnon from "./components/IsAnon";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import TeacherBookings from "./components/TeacherBookings";
import IsTeacher from "./components/isTeacher";
import CreateBooking from "./components/CreateBooking";
import BookingDetails from "./components/BookingDetails";
import TeacherServices from "./components/TeacherServices";
import NavbarPage from "./components/NavbarPage";
import CreateService from "./components/CreateService";
import ServiceEdit from "./components/ServiceEdit";
import { Container } from "react-bootstrap";

function App() {
  const [bookings, setBookings] = useState([]);

  const getBookings = (token) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((bookingsObj) => {
        setBookings(bookingsObj.data);
      })
      .catch((err) =>
        console.log("Problem getting the bookings from database" + err)
      );
  };

  return (
    <div className="App">
      <NavbarPage />

      <Routes>
        <Route path="/" element={<Home />} />

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
              <UserBookings
                bookings={bookings.bookings}
                updateBookings={getBookings}
              />
            </IsPrivate>
          }
        />
        <Route
          path="/bookings/teacher"
          element={
            <IsTeacher>
              <TeacherBookings
                bookings={bookings.teacherbookings}
                updateBookings={getBookings}
              />
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

        <Route
          path="/services"
          element={
            <IsTeacher>
              <TeacherServices />
            </IsTeacher>
          }
        />
        <Route
          path="/service/create"
          element={
            <IsTeacher>
              <CreateService />
            </IsTeacher>
          }
        />

        <Route path="/service/edit/:id" element={<ServiceEdit />} />
      </Routes>


        

    </div>
  );
}

export default App;
