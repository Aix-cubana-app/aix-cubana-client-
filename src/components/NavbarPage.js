// src/components/Navbar.js

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

function NavbarPage() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  //  Update the rendering logic to display different content
  //  depending on the user being logged in or not
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">Aix-Cubana</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>

            {isLoggedIn && (
              <>
                <Nav.Link href="/bookings/user">User Bookings</Nav.Link>
                <Nav.Link href="/bookings/create">Create Booking</Nav.Link>

                {user.isTeacher && (
                  <>
                    <NavDropdown
                      title="TeachersMenu"
                      id="basic-nav-dropdown"                      
                    >
                      <NavDropdown.Item href="/bookings/teacher">
                        Teacher Bookings
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/services">
                        {" "}
                        Teacher Services{" "}
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/service/create">
                        Create Service
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
                <>
                  <Navbar.Text>
                    Signed in as: <span>{user && user.name}</span>
                  </Navbar.Text>
                  <Button variant="dark" onClick={logOutUser} gap={5}>
                    Logout
                  </Button>{" "}
                </>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Nav.Link href="/signup/">Sign Up</Nav.Link>
                <Nav.Link href="/login/">Log In</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
