// This is the page where the user is directed after logging in.
import './styles/home.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import AudioPlayer from "react-h5-audio-player";
import {useState} from "react";
import Axios from "axios";
const jwt = require('jsonwebtoken');


const MyMusic = () => {
  
  const [albumList, setAlbumList] = useState([]);
  const [album_id, setAlbum_id] = useState("");
  const [user_id, setUser_id] = useState("");
  const [friend_ids, setFriend_ids] = useState([]);

  let history = useHistory();



  React.useEffect(() => {
    var artist_id = localStorage.getItem("user_id");
  
    Axios.get(`http://localhost:3001/albums/${artist_id}`).then((res) => {
      console.log(res.data)
      setAlbumList(res.data)
     })

    // Get the user_id from the local storage.
    const user_id = localStorage.getItem("user_id");
    setUser_id(user_id);

    // Take the friend ids.
    Axios.post("http://localhost:3001/getFriends", {
      receiver_id: user_id,
    }).then((response) => {
      if (response.data) {
        console.log("response.data",response.data)
        setFriend_ids(response.data);
        // console.log("friend_ids:", friend_ids)
      }
    });
  },[])

  // This method is to delete the access token from the local storage
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // Following methods are to route to the relevant page.
  const toHome = () => {
    history.push("/Home_artist")
  }
  const toProfile = () => {
    history.push("/Profile_artist")
  }
  const toSearch = () => {
    history.push("/Search_artist")
  }
  const toCreateAlbumSingle = (id) => {
    history.push("/CreateAlbumSingle")
  }
  const toCreateSong = () => {
    history.push("/CreateSong")
  }
  const toMyUpload = (album_id) => {
    localStorage.setItem("album_id",album_id);
    history.push("/MyUpload")
  }
  const toFriend = () => {
    history.push("/Friend_artist")
  }
  const toLibrary = () => {
    history.push("/Library_artist")
  }
  const toFriendInfo = (friend_id) => {
    console.log("friend_id", friend_id)
    localStorage.setItem("friend_id", friend_id);
    history.push("/friend_info_artist");
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
        <div id = "left" className = "left">
          <br />
          <button className="homeButton" onClick={toHome}>Home</button><br/><br/>
          <button className="profileButton" onClick={toProfile}>Profile</button><br/><br/>
          <button className="searchButton" onClick={toSearch}>Search</button><br/><br/>
          <button className="libraryButton" onClick={toLibrary}>Library</button><br/><br/>
          <button className="mymusicButton">My Music</button>
        </div>
        <div id = "middle" className = "middle">
          <h1 className="myMusic">My Music</h1>
          <button className="createAlbum" onClick={toCreateAlbumSingle}>CREATE ALBUM</button><br /><br />

          {albumList.map((val, key) => {
          return <div className="middle_album" onClick = {()=>toMyUpload(val.album_id)}> 
            <img className="albumCover" src={val.img_src} alt="Italian Trulli" ></img><br />
            <button className="albumButton">{val.album_name}</button>   
            <h4>{val.year}</h4>          
          </div>
          })}
          
        </div>
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

export default MyMusic;