// This is the page where the user is directed after logging in.
import './styles/home.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import AudioPlayer from "react-h5-audio-player";
import Axios from "axios";

const Friend = () => {

  // Use states.
  const [username, setUsername] = useState("");
  const [result, setResult] = useState([]);
  const [sender_id, setSender_id] = useState("");
  const [request, setRequest] = useState([]);
  const [user_id, setUser_id] = useState("");
  const [friend_ids, setFriend_ids] = useState([]);

  let history = useHistory();

  React.useEffect(() => {

    const isArtist = localStorage.getItem("artist")
    if(isArtist == 1){
      history.push("/Friend_artist")
    }

    const sender = localStorage.getItem("user_id");
    setSender_id(sender);

    // Get the user_id from the local storage.
    const user_id = localStorage.getItem("user_id");
    setUser_id(user_id);

    // Take the friendship requests.
    Axios.post("http://localhost:3001/getFriendRequests", {
      receiver_id: user_id,
    }).then((response) => {
      if (response.data) {
        setRequest(response.data);
      }
    });

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

  // This method is to add users to the database.
  const friendRequest = (receiver_id) => {
    if(receiver_id){
      Axios.post("http://localhost:3001/friendRequest", {
        sender_id: sender_id,
        receiver_id: receiver_id,
        approval: null,
      })
    }
  };

  // This function is to search the users.
  const searchUser = () => {
    Axios.post("http://localhost:3001/searchUser", {
        sender_id: sender_id,
        username: username,
    }).then((response) => {
        if (response.data) {
        setResult(response.data);
        }
    });
  };

  // This function is to search the users.
  const acceptRequest = (sender_id) => {
    console.log("sender_id bunu silllllllllllllllllllll",sender_id)
    Axios.post("http://localhost:3001/accept", {
        sender_id: sender_id,
        receiver_id: user_id,
    }).then((response) => {
      console.log("ajashasdhadshdasjadsjads",response)
    });
  };

  // This function is to search the users.
  const declineRequest = (sender_id) => {
    console.log("sender_id bunu silllllllllllllllllllll",sender_id)
    Axios.post("http://localhost:3001/decline", {
        sender_id: sender_id,
        receiver_id: user_id,
    }).then((response) => {
      console.log("ajashasdhadshdasjadsjads",response)
    });
  };

  // This method is to delete the access token from the local storage
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // Following methods are to route to the relevant pages.
  const toHome = () => {
    history.push("/Home")
  }
  const toProfile = () => {
    history.push("/Profile")
  }
  const toSearch = () => {
    history.push("/Search")
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
        <div id = "left" className = "left">
          <br />
          <button className="homeButton" onClick={toHome}>Home</button><br/><br/>
          <button className="profileButton" onClick={toProfile}>Profile</button><br/><br/>
          <button className="searchButton" onClick={toSearch}>Search</button><br/><br/>
          <button className="libraryButton" onClick={toLibrary}>Library</button><br/><br/>
        </div>
        <div id = "middle" className = "middle">
          <div className="middleLeft">
              <h2>Search User</h2>
              <input className="input" type="text" onChange={(event) => {setUsername(event.target.value);}}/>
              <button className="searchButton2" onClick={searchUser}></button><br />
              <h4 className="userInfoLeft">Username</h4><h4 className="userInfoRight">User ID</h4>
              {result.map((val, key) => {
                // if(!added.includes(val.user_id)){
                  return (
                    <div className="users">
                      <button className="username">{val.username}</button>
                      <button className="user_id">{val.user_id}</button>
                      <button className="addUser" onClick={()=>friendRequest(val.user_id)}>+</button><br />                       
                    </div>
                  );
                // }
               })
              }
          </div>
          <div className="middleRight">
              <h2>Friend Requests</h2>
              {request.map((val, key) => {
              return (
                <div className="tracks">
                  <h4>The user {val.username} sent you a friendship request.</h4>
                  <button className="requestButton" onClick={()=>acceptRequest(val.sender_id)}>Accept</button>
                  <button className="requestButton" onClick={()=>declineRequest(val.sender_id)}>Decline</button>
                </div>
                    );
                })
              }
          </div>
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
              src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
              onPlay={e => console.log("onPlay")}
              // other props here
        />
        </div>
    </div>
    </body>
  );
  }

  export default Friend;