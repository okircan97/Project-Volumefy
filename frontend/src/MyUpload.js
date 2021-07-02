// This is the page where the user is directed after logging in.
import './styles/home.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import AudioPlayer from "react-h5-audio-player";
import {useState} from "react";
import Axios from "axios";


const MyUpload = () => {
  
  const [user_id, setUser_id] = useState("");
  const [friend_ids, setFriend_ids] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [album_id, setAlbum_id] = useState("");
  const [songs, setSongs] = useState([]);
  var [index, setIndex] = useState(0);

  let history = useHistory();

  React.useEffect(() => {

    const isArtist = localStorage.getItem("artist")

    // Get the user_id from the local storage.
    const user_id = localStorage.getItem("user_id");
    setUser_id(user_id);

    const album_id = localStorage.getItem("album_id");
    setAlbum_id(album_id);

    

    Axios.post("http://localhost:3001/getAlbumInfo", {
      album_id: album_id,
    }).then((response) => {
      if (response.data) {
        console.log("response.data",response.data)
        setAlbums(response.data);
        // console.log("friend_ids:", friend_ids)
      }
    });

    // Take the friend ids.
    Axios.post("http://localhost:3001/getFriends", {
      receiver_id: user_id,
    }).then((response) => {
      if (response.data) {
        console.log("response.data",response.data)
        setFriend_ids(response.data);
      }
    });

    // Take the songs from the relevant album.
    Axios.post("http://localhost:3001/getSongs", {
      album_id: album_id,
    }).then((response) => {
      if (response.data) {
        console.log("response.data",response.data)
        setSongs(response.data);
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
  const toFriendInfo = (friend_id) => {
    console.log("friend_id", friend_id)
    localStorage.setItem("friend_id", friend_id);
    history.push("/friend_info_artist");
  }
  const toLibrary = () => {
    history.push("/Library_artist")
  }
  const toCreateSong = () => {
    history.push("/createSong");
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
        {/* /Album Info */}
        {albums.map((val, key) => {
          return <div className = "albumInfo2"> 
            <img className ="albumCover2" src={val.img_src} alt="Italian Trulli" ></img><br />
            <h1 className ="albumInfoPt2">{val.album_name}</h1>
            <button className = "addSong2" onClick={toCreateSong}>Add Song</button>    
            <br />
            <h2 className = "albumInfoPt2Year">{val.year}</h2>          
          </div>
          })}
        {/* The songs of the album */}
        {songs.map((val, key) => {
          index = index + 1;
          return (
            <div className="songs2">
              <button className="song2">{index}) {val.song_name}</button><br />
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

export default MyUpload;