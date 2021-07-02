// This is the page where the user is directed after logging in.
import './styles/home.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import AudioPlayer from "react-h5-audio-player";
import {useState} from "react";
import Axios from "axios";

const CreateSong = () => {
  
  const [song_id, setSong_id] = useState("");   
  const [album_id, setAlbum_id] = useState("");                                    
  const [song_name, setSong_name] = useState("");
  const [genre_id, setGenre_id] = useState("");
  const [song_src, setSong_src] = useState("");

  let history = useHistory();

  React.useEffect(() => {
    var album_id = localStorage.getItem("album_id");

    setAlbum_id(album_id);
  })

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

  const addSong = (event) => {
  
    // Add elements to the database.
 
      console.log("ıcerdeyım")
      Axios.post("http://localhost:3001/createSong", {
        song_id : null,
        album_id : album_id,
        song_name : song_name,
        genre_id : genre_id,
        song_src : song_src
      }).then((response) => {
        console.log(response);
        history.push("/CreateSong")
      }
      )
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
          <h1>CREATE SONG</h1>
          <input type="text" placeholder="Enter the song name" onChange={(event) => {setSong_name(event.target.value);}}/><br /><br />
          <input type="text" placeholder="Enter the music source" onChange={(event) => {setSong_src(event.target.value);}}/><br /><br />
          <select className="genreSelectTag" placeholder="Enter the genre" onChange={(event) => {setGenre_id(event.target.value);}}>
            <option value="1">Classical</option>                                                              
            <option value="2">EDM</option>
            <option value="3">Flamenco</option>
            <option value="4">Heavy Metal</option>
            <option value="5">Jazz </option>
            <option value="6">Pop</option>
            <option value="7">Post Punk</option>
            <option value="8">Rock</option>
            <option value="9">Vaporwave</option>
        </select><br /><br />
          <button onClick={() => {addSong();}}>{" "}Create</button><br /><br />
          <button onClick={toMyMusic}>DONE</button>
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

export default CreateSong;