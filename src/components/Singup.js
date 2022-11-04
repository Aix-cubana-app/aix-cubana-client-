// src/pages/SignupPage.js

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../context/auth.context";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleIsTeacher = () => {
    setIsTeacher(!isTeacher);
  };

  const handleSignupSubmit = (e) => {

    e.preventDefault();

    const requestBody = { email, password, name, isTeacher };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then( (response) => {

        
        // Save the token in the localStorage.
        storeToken(response.data.authToken);

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser();
            
        navigate("/");

      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });

    setEmail("");
    setPassword("");
    setName("");
    setIsTeacher(false);
  };

  return (
    <Container>
      <Form onSubmit={handleSignupSubmit}>
        <Form.Group className="mb-3" controlId="signUpEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="signUpPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="signUpName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your first and last Name"
            name="name"
            value={name}
            onChange={handleName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="isTeacherCheckbox">
          <Form.Check
            type="checkbox"
            label="Are you a teacher"
            checked={isTeacher}
            onChange={handleIsTeacher}
          />
        </Form.Group>

      {errorMessage && (
        <p>User already exist</p>
      )}
        <Button variant="primary" type="submit">
          SingUp
        </Button>
      </Form>


      <Container>
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </Container>
    </Container>
  );
}

export default SignupPage;
