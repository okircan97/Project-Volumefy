// This is the pArtist where the user is directed after logging in.
import '../styles/home.css';
import volumefy from "../images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Axios from "axios";
import {useState} from "react";
const jwt = require('jsonwebtoken');

const Artist = () => {
  // We'll store all the users in the database inside this list.
  const [userList, setUserList] = useState([]);

  const [artist_id, setArtistId] = useState("");
  const [artist_name, setArtist_name] = useState("");

  let history = useHistory();

  // On load, get the token from the local storArtist and get
  // the id from it.
  React.useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    // console.log(response);
    setArtistId(user_id);
  },[])

  // This method is to delete the access token from the local storArtist
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // This method is to route to the home pArtist.
  const toHome = () => {
    history.push("/Home")
  }

  // This method is to route to the profile pArtist.
  const toProfile = () => {
    history.push("/Profile")
  }

  // This method is to route to the search pArtist.
  const toSearch = () => {
    history.push("/Search")
  }

  const addArtist = (event) => {
    Axios.put("http://localhost:3001/editArtist", { artist: 1, user_id: artist_id })

    if(!artist_name){
      event.preventDefault();
    }
    // Add elements to the database.
    else{
      Axios.post("http://localhost:3001/createArtist", {
        artist_id: artist_id,
        artist_name: artist_name,
      }).then((response) => {
        console.log(response);
        localStorage.setItem("artist", 1)
        history.push("/Home_artist");
      }
      )}
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
              <h1>Artist</h1>
              <input type="text" placeholder="Enter the artist name" onChange={(event) => {setArtist_name(event.target.value);}}/><br /><br />
              <button onClick={() => {addArtist();}}>{" "}Create!</button>
          </div>


        {/* Friends */}
        <div id = "right" className = "right">
          <h2>Friends</h2>
        </div>
    </div>
    </body>
  );
}

export default Artist;