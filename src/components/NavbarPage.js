// src/components/Navbar.js

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function NavbarPage() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  //  Update the rendering logic to display different content
  //  depending on the user being logged in or not
  return (
    <nav>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>

      {isLoggedIn && (
        <>
          <NavLink to="/bookings/user">
            <button>User Bookings</button>
          </NavLink>

          <NavLink to="/bookings/create">
            <button>Create Booking</button>
          </NavLink>

          {user.isTeacher && ( 
              <div>
              <NavLink to="/bookings/teacher">
                <button>Teacher Bookings</button>
              </NavLink>   
              <NavLink to="/services">
                <button>Teacher Services</button>
              </NavLink>   
              </div>           
          )}

          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/signup/">
            {" "}
            <button>Sign Up</button>{" "}
          </NavLink>
          <NavLink to="/login/">
            {" "}
            <button>Login</button>{" "}
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default NavbarPage;
