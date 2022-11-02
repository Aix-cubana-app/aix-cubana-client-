import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ServiceEdit() {

  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  const { id } = useParams();

  const [details, setDetails] = useState({});

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    getServiceDetails(storedToken);
  }, []);

  const getServiceDetails = (token) => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/service/details/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((serviceDetails) => {
        setDetails(serviceDetails.data);
        setTitle(serviceDetails.data.title);
        setPrice(serviceDetails.data.price);
        setStyle(serviceDetails.data.style);
        setLevel(serviceDetails.data.level);
      })
      .catch((err) =>
        console.log("Problem getting the Booking from database" + err)
      );
  };

  const deleteService = (token, serviceId) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/service/delete/${serviceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((deletedService) => {
        console.log("You deleted the service with ID" + deleteService._id);
        navigate("/services");
      })
      .catch((err) =>
        console.log("Problem deleting the services from database" + err)
      );
  };

  //Handling the form


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedService = {
      title,
      price,
      style,
      level,
      teacher: user._id,
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/service/update/${id}`,
        updatedService,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((service) => {
        navigate("/services");
      })
      .catch((err) => console.log("Problem creating a new Service" + err));
  };

  return (
    <div className="container">
      <form id="create-service-form" onSubmit={handleSubmit}>
        <div>
          <div>
            <label for="title-form">Title:</label>
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
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          >
            <option value="Beginner"> Beginner </option>
            <option value="Middle"> Middle</option>
            <option value="Advance"> Advance</option>
          </select>
        </div>

        <button>Update Service</button>
      </form>
      <button onClick={() => deleteService(storedToken, id)}>Delete</button>
    </div>
  );
}

export default ServiceEdit;
