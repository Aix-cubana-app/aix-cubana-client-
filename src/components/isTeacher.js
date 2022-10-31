// src/components/IsTeacher.js

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsTeacher( { children } ) {
  
  const { isLoading, user } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) return <p>Loading ...</p>;

  if (!user.isTeacher) {
    // If the user is logged in, navigate to home page     
    return <Navigate to="/" />;
  } else {
    // If the user is not logged in, allow to see the page 
    return children;
  }
}

export default IsTeacher;