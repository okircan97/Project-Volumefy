// This is the page where the user is directed after logging in.
import './styles/profile.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Axios from "axios";
import {useState} from "react";
import AudioPlayer from "react-h5-audio-player";
const jwt = require('jsonwebtoken');

const Profile = () => {
  // We'll store all the users in the database inside this list.
  const [user, setUser] = useState("");
  const [user_id, setUser_id] = useState("");
  const [friend_ids, setFriend_ids] = useState([]);
  let history = useHistory();

  React.useEffect(() => {
    var user_id = localStorage.getItem("user_id");
      if(localStorage.getItem("artist")){
        history.push("/profile_artist")
      }
      Axios.post("http://localhost:3001/user", {
        user_id: user_id,
      }).then((res) => {
        setUser(res.data[0]);
       })

    // Take the friend ids.
    Axios.post("http://localhost:3001/getFriends", {
      receiver_id: user_id,
    }).then((response) => {
      if (response.data) {
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

  // following are to route to the relevant page.
  const toHome = () => {
    history.push("/Home")
  }
  const toProfile = () => {
    history.push("/Profile")
  }
  const toSearch = () => {
    history.push("/Search")
  }
  const toGender = () => {
    history.push("/Gender")
  }
  const toAge = () => {
    history.push("/Age")
  }
  const toCountry = () => {
    history.push("/Country")
  }
  const toPhone = () => {
    history.push("/Phone")
  }
  const toArtist = () => {
    history.push("/Artist");
  }
  const toFriend = () => {
    history.push("/Friend")
  }
  const toLibrary = () => {
    history.push("/Library")
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
          <h3 className="userInfo">user ID: {user.user_id}</h3>       <button className="editButton">edit</button><br/>
          <h3 className="userInfo">username: {user.username}</h3>       <button className="editButton">edit</button><br/>
          <h3 className="userInfo">email: {user.email}</h3>             <button className="editButton">edit</button><br/>
          <h3 className="userInfo">gender: {user.gender}</h3>           <button className="editButton" onClick={toGender}>edit</button><br/>
          <h3 className="userInfo">age: {user.age}</h3>                 <button className="editButton" onClick={toAge}>edit</button><br/>
          <h3 className="userInfo">country: {user.country}</h3>         <button className="editButton" onClick={toCountry}>edit</button><br/>
          <h3 className="userInfo">phone number: {user.phone}</h3>      <button className="editButton" onClick={toPhone}>edit</button><br/>
          <h3 className="userInfo">Want to be an artist?</h3>          <button className="artistButton" onClick={toArtist}>BECOME ONE!</button><br/>
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
              // src="https://drive.google.com/file/d/1-6TgFFkkBkja4-ucvHadrTucep4_UfKC/view?usp=sharing"
              src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
              // src="../public/Used.mp3"
              // src={music}
              onPlay={e => console.log("onPlay")}
              // other props here
        />
        </div>
        
    </div>
    </body>
  );
}

export default Profile;