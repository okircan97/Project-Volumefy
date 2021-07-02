import "./styles/signup.css";
import volumefy from "./images/volumefy.png";
import { useState } from "react";
import * as React from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
const jwt = require('jsonwebtoken');

// HOME (INDEX) PAGE
const Signup = () => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userlist, setUserList] = useState([]);

  // Defining history. It'll be used while routing 
  // between pages.
  let history = useHistory();

  React.useEffect(() => {
    if(localStorage.getItem("response")){
      history.push("/Home");
    };
  })

  // This method is to add users to the database.
  const addUser = (event) => {
    var id =  null;
    setId(id);
    // If there's any null element, don't load the new
    // page nor add the element to the table.
    if(!username || !email || !password){
      event.preventDefault();
    }
    // Add elements to the database.
    else{
      Axios.post("http://localhost:3001/create", {
        id: id,
        username: username,
        email: email,
        password: password,
      }).then(() => {
        setUserList([
          ...userlist,
          {
            id: id,
            username: username,
            email: email,
            password: password,
          },
        ]);
      });
      history.push("/login");
    }
  };

  // This method is to route to the login page.
  const login = () => {
    history.push("/login");
  }

  // This method is to get the elements from the database.
  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUserList(response.data);
    });
  };

  return (
    <div className="Home">
      {/* Name and logo */}
      <div>
        <img src={volumefy} className="logo" />
        <h1 className="h1text"> VOLUMEFY</h1>
        <hr />
      </div>
      {/* Inputs */}
      <h2>Email Address</h2>
      <input className="input" type="email" onChange={(event) => {
            setEmail(event.target.value);
          }}/>
      <h2>User Name</h2>
      <input className="input" type="text" onChange={(event) => {
            setUsername(event.target.value);
          }}/>
      <h2>Password</h2>
      <input className="input" type="password" onChange={(event) => {
            setPassword(event.target.value);
          }}/>
      <br />
      <br />
      <button onClick={addUser}>SIGN UP</button>
      {/* Direct to the login page */}
      <h2>Already have an account?</h2>
      <button onClick={login}>SIGN IN</button>
    </div>
  );
};

export default Signup;
