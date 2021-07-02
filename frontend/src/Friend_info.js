// This is the page where the user is directed after logging in.
import './styles/profile.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Axios from "axios";
import {useState} from "react";
import AudioPlayer from "react-h5-audio-player";

const Friend_info = () => {
  // We'll store all the users in the database inside this list.
  const [result, setResult] = useState([]);
  const [source, setSource] = useState("");
  const [user, setUser] = useState("");
  const [friend_ids, setFriend_ids] = useState([]);
  let history = useHistory();

  React.useEffect(() => {
    var friend_id = localStorage.getItem("friend_id");
    var user_id = localStorage.getItem("user_id");
      if(localStorage.getItem("artist")){
        history.push("/Friend_info_artist")
      }
      Axios.post("http://localhost:3001/user", {
        user_id: friend_id,
      }).then((res) => {
        setUser(res.data[0]);
       })

    // Take the friend ids.
    Axios.post("http://localhost:3001/getFriends", {
      receiver_id: user_id,
    }).then((response) => {
      if (response.data) {
        console.log("response.data",response.data)
        setFriend_ids(response.data);
      }
    });
  },[])

  // This method is to delete the access token from the local storage
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // fOLLOWİNG ARE TO ROUTE TO THE RELEVANT PAGE.
  const toHome = () => {
    history.push("/Home")
  }
  const toProfile = () => {
    history.push("/Profile")
  }
  const toSearch = () => {
    history.push("/Search")
  }
  const toLibrary = () => {
    history.push("/Library")
  }
  const toFriend = () => {
    history.push("/Friend")
  }
  const toFriendInfo = (friend_id) => {
    console.log("friend_id", friend_id)
    localStorage.setItem("friend_id", friend_id);
    history.push("/friend_info");
  }

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
          <button className="libraryButton" onClick={toLibrary}>Library</button><br/><br/>
        </div>
        
        <div className="middle_h"> 
          <h3 className="userInfo">user ID: {user.user_id}</h3> <br /><br />     
          <h3 className="userInfo">username: {user.username}</h3><br /><br />
          <h3 className="userInfo">Liked songs: </h3>
          {result.map((val, key) => {
              return (
                <div className="tracks">
                  <button className ="track" onClick={() => setSource(val.song_src)}>{val.song_name}</button>
                  <button className ="track" onClick={() => setSource(val.song_src)}>{val.album_name}</button>
                  <button className ="track" onClick={() => setSource(val.song_src)}>{val.artist_name}</button>
                </div>
              );
            })
          }

        </div>
        {/* Friends */}
        <div id = "right" className = "right">
        <button className="friendButton" onClick={toFriend}>Friends</button><br/><br/>
        {friend_ids.map((val, key) => {
              return (
                <div className="friends">
                  <button className="toUserButtons" onClick={()=>toFriendInfo(val.friend)}>{val.friend}</button>
                </div>
              );
           })
          }
        </div>

        <div className ="buttom">
        <AudioPlayer
              src={source}
              onPlay={e => console.log("onPlay")}
        />
        </div>
        
    </div>
    </body>
  );
}

export default Friend_info;