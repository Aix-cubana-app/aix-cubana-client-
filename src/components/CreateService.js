import axios from "axios";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function CreateService() {

  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    const newService = {
        title,
        price,
        style,
        level,
        teacher: user._id      
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api//service/create`, newService, 
      { headers: { Authorization: `Bearer ${storedToken}` }     })
      .then( (service) => {

        navigate("/services");

      })
      .catch((err) => console.log("Problem creating a new Service" + err));




  };

  return (
    <div className="container">
      <form id="create-service-form" onSubmit={handleSubmit}>
        <div>
          <div>
            <label for="title-form">Service Name:</label>
          </div>

          <div>
            <input
              id="title-form"
              type="text"
              name="title"
              value={title}
              placeholder="Here the title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>  

        <div>
          <div>
            <label for="price-form">Price:</label>
          </div>

          <div>
            <input
              id="price-form"
              type="number"
              name="price"
              value={price}              
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </div>     

        <div>
          <div>
            <label for="style-form">Style:</label>
          </div>

          <div>
            <input
              id="style-form"
              type="text"
              name="style"
              value={style}
              placeholder="The dancing style here"
              onChange={(e) => {
                setStyle(e.target.value);
              }}
            />
          </div>
        </div>          

        <div>
          <label for="level-select">Choose a level:</label>

          <select
            name="level"
            id="level-select"
            form="create-service-form"
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          >
            <option value="Beginner" > Beginner </option>
            <option value="Middle" > Middle</option>
            <option value="Advance" > Advance</option>
           
          </select>
        </div>  
        

        <button>Create Service</button>
      </form>
    </div>
  );
}

export default CreateService;
