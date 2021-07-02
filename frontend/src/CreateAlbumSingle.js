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

const CreateAlbumSingle = () => {

  const [album_id, setAlbum_id] = useState("");
  const [artist_id  , setArtist_id] = useState("");
  const [album_name, setAlbum_name] = useState("");
  const [year, setYear] = useState("");
  const [img_src, setImg_src] = useState("");
    
  let history = useHistory();

  React.useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    setArtist_id(user_id)

  },[])

  // This method is to delete the access token from the local storage
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // Following are to route to the relevant page.
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
  const toLibrary = () => {
    history.push("/Library_artist")
  }

  // This method is to add an album to the database.
  const addAlbum = (event) => {

    var album_id =  null;
    setAlbum_id(album_id);

    if(!album_name || !year || !img_src){
        event.preventDefault();
    }

    // Add elements to the database.
    else{
      
      Axios.post("http://localhost:3001/createAlbum", {
        album_id: album_id,
        artist_id: artist_id,           
        album_name: album_name,
        year: year,
        img_src: img_src
      }).then((response) => {
        localStorage.setItem("album_id", response.data.album_id)
        history.push("/CreateSong")
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
        <div id = "left" className = "left">
          <br />
          <button className="homeButton" onClick={toHome}>Home</button><br/><br/>
          <button className="profileButton" onClick={toProfile}>Profile</button><br/><br/>
          <button className="searchButton" onClick={toSearch}>Search</button><br/><br/>
          <button className="libraryButton" onClick={toLibrary}>Library</button><br/><br/>
          <button className="mymusicButton" onClick={toMyMusic}>My Music</button>
        </div>
        <div id = "middle" className = "middle">
          <h1>CREATE ALBUM/SINGLE</h1>
          <input type="text" placeholder="Enter the album name" onChange={(event) => {setAlbum_name(event.target.value);}}/><br /><br />
          <input type="text" placeholder="Enter the year" onChange={(event) => {setYear(event.target.value);}}/><br /><br />
          <input type="text" placeholder="Enter the album cover's source" onChange={(event) => {setImg_src(event.target.value);}}/><br /><br />
          <button onClick={() => {addAlbum();}}>{" "}Create!</button>

        </div>
        <div id = "right" className = "right">
          <h2>Friends</h2>
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

export default CreateAlbumSingle;