// This is the page where the user is directed after logging in.
import "./styles/home.css";
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import Axios from "axios";
import AudioPlayer from "react-h5-audio-player";

const Search_artist = () => {
  
  let history = useHistory();
  
  const [song_name, setSong_name] = useState("");
  const [result, setResult] = useState([]);

  const [user_id, setUser_id] = useState("");
  const [friend_ids, setFriend_ids] = useState([]);

  const [source, setSource] = useState("");

  React.useEffect(() => {

    const isArtist = localStorage.getItem("artist")

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


  // This function is to search the tracks.
  const searchTrack = () => {
    Axios.post("http://localhost:3001/searchTrack", {
      song_name: song_name,
    }).then((response) => {
      if (response.data) {
        setResult(response.data);
        console.log(result)
      }
    });
  };

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

  // This method is to change to song.
  const changeSong = (param) => {
    setSource(param)
  }

  const likeSong = (song_id) => {
    Axios.post("http://localhost:3001/likeSong", {
      user_id: user_id,
      song_id: song_id
  })
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
          <button className="searchButton"  onClick={toSearch}>Search</button><br/><br/>
          <button className="libraryButton" onClick={toLibrary}>Library</button><br/><br/>
          <button className="mymusicButton" onClick={toMyMusic}>My Music</button>
        </div>
        <div id = "middle" className = "middle">
          <h1>SEARCH</h1>
          {/* Search results */}
          <input className="input" type="text" onChange={(event) => {setSong_name(event.target.value);}}/>
          <button className="searchButton2" onClick={searchTrack}></button><br />
          <h4 className="songInfoLeft">Song</h4><h4 className="songInfoMiddle">Album</h4><h4 className="songInfoRight">Artist</h4>
          {result.map((val, key) => {
              return (
                <div className="tracks">
                  <button className="likeButton" onClick={() => likeSong(val.song_id)} ></button>
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

export default Search_artist;