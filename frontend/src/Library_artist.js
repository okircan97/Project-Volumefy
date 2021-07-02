// This is the page where the user is directed after logging in.
import './styles/home.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import AudioPlayer from "react-h5-audio-player";
import {useState} from "react";
import Axios from "axios";

const Library_artist = () => {

  const [user_id, setUser_id] = useState("");
  const [friend_ids, setFriend_ids] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [source, setSource] = useState([]);

  let history = useHistory();

  React.useEffect(() => {

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
      }
    });

    // Take the liked songs.
    Axios.post("http://localhost:3001/getLikedSongs", {
      user_id: user_id,
    }).then((response) => {
      if (response.data) {
        setLikedSongs(response.data);
      }
    });

    },[])

  // This method is to delete the access token from the local storage
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // Following methods are to route to the relevant pages.
  const toHome = () => {
    history.push("/Home_artist")
  }
  const toProfile = () => {
    history.push("/Profile_artist")
  }
  const toSearch = () => {
    history.push("/Search_artist")
  }
  const toMyMusic = () => {
    history.push("/MyMusic")
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
          <button className="mymusicButton" onClick={toMyMusic}>My Music</button>
        </div>
        <div id = "middle" className = "middle">
          <h4 className="songInfoLeft">Song</h4><h4 className="songInfoMiddle">Album</h4><h4 className="songInfoRight">Artist</h4>
          {likedSongs.map((val, key) => {
                return (
                  <div className="songs3">
                    <button className ="track" onClick={() => setSource(val.song_src)}>{val.song_name}</button>
                    <button className ="track" onClick={() => setSource(val.song_src)}>{val.album_name}</button>
                    <button className ="track" onClick={() => setSource(val.song_src)}>{val.artist_name}</button>
                  </div>
                );
            })
          }
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
              src={source}
              onPlay={e => console.log("onPlay")}
        />
        </div>
        
    </div>
    </body>
  );
}

export default Library_artist;