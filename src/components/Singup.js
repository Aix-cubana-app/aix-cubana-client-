// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleIsTeacher = () => {
    setIsTeacher(!isTeacher)
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    

    const requestBody = { email, password, name, isTeacher };
   
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((newUser) => {
        console.log("You created a new User");
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
    <div className="SignupPage">
      <h1>Sign Up</h1>
      <div id="form-div">
        <form onSubmit={handleSignupSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleName} />

          <label for="is-teacher"> Are you a dance teacher?</label>
          <input
              type="checkbox"
              checked={isTeacher}
              onChange={handleIsTeacher}
            />

          <button type="submit">Sign Up</button>
        </form>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
