// This is the pAge where the user is directed after logging in.
import '../styles/home.css';
import volumefy from "../images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Axios from "axios";
import {useState} from "react";
const jwt = require('jsonwebtoken');

const Age = () => {

  // useState for new Age.
  const [newAge, setNewAge] = useState("");
  const [user, setUser] = useState("");

  let history = useHistory();

  // On load, get the token from the local storAge and get
  // the id from it.
  React.useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setUser(user_id);
  })

  // This method is to delete the access token from the local storAge
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // This method is to route to the home pAge.
  const toHome = () => {
    history.push("/Home")
  }

  // This method is to route to the profile pAge.
  const toProfile = () => {
    history.push("/Profile")
  }

  // This method is to route to the search pAge.
  const toSearch = () => {
    history.push("/Search")
  }

  const editAge = (user_id) => {
    Axios.put("http://localhost:3001/editAge", { age: newAge, user_id: user_id })
    history.push("/Profile")
  };


  return (
    <body class="bMain">
    <div className="Main" >
      {/* Name and logo */}
        <div id = "header" className = "header">
            <img src={volumefy} className="logo2"/>
            <h1 className="vol"> VOLUMEFY</h1>
            <div id = "upper" className = "upper"></div>
            <button className="logout" onClick={logOut}>SIGN Out</button>
            <hr/>
        </div>
        {/* Navigation buttons */}
        <div id = "left" className = "left">
          <br />
          <button className="homeButton" onClick={toHome}>Home</button><br/><br/>
          <button className="profileButton" onClick={toProfile}>Profile</button><br/><br/>
          <button className="searchButton" onClick={toSearch}>Search</button><br/><br/>
          <button className="libraryButton">Library</button>
        </div>
        <div className="middle"> 
            <h1>Age</h1>
            <input type="text" placeholder="Enter the Age" onChange={(event) => {setNewAge(event.target.value);}}/><br /><br />
            <button onClick={() => {editAge(user);}}>{" "}Update</button>
        </div>

        {/* Friends */}
        <div id = "right" className = "right">
          <h2>Friends</h2>
        </div>
    </div>
    </body>
  );
}

export default Age;