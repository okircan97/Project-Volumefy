// This is the page where the user is directed after logging in.
import '../styles/home.css';
import volumefy from "../images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Axios from "axios";
import {useState} from "react";
const jwt = require('jsonwebtoken');

const Gender = () => {

  // useState for new gender.
  const [newGender, setNewGender] = useState("");
  const [user, setUser] = useState("");

  let history = useHistory();

  // On load, get the token from the local storage and get
  // the id from it.
  React.useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setUser(user_id);
  })

  // This method is to delete the access token from the local storage
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // This method is to route to the home page.
  const toHome = () => {
    history.push("/Home")
  }

  // This method is to route to the profile page.
  const toProfile = () => {
    history.push("/Profile")
  }

  // This method is to route to the search page.
  const toSearch = () => {
    history.push("/Search")
  }

  const editGender = (user_id) => {
    Axios.put("http://localhost:3001/editGender", { gender: newGender, user_id: user_id })
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
            <h1>Gender</h1>
            <input type="text" placeholder="Enter the gender" onChange={(event) => {setNewGender(event.target.value);}}/><br /><br />
            <button onClick={() => {editGender(user);}}>{" "}Update</button>
        </div>

        {/* Friends */}
        <div id = "right" className = "right">
          <h2>Friends</h2>
        </div>
    </div>
    </body>
  );
}

export default Gender;