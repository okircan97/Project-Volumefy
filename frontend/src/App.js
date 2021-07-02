// This is the main app handling the route switches.

import './styles/App.css';
import Signup from "./Signup"
import Login from "./Login"
import Home from "./Home"
import Search from "./Search"
import Home_artist from "./Home_artist"
import Profile_artist from './Profile_artist';
import Search_artist from './Search_artist';
import Profile from "./Profile"
import MyMusic from './MyMusic';
import MyUpload from './MyUpload';
import Friend from "./Friend";
import Library from './Library';
import Library_artist from './Library_artist';
import Genre from './Genre';
import Genre_artist from './Genre_artist';
import Friend_artist from './Friend_artist';
import Friend_info from './Friend_info';
import Friend_info_artist from './Friend_info_artist';
import CreateAlbumSingle from './CreateAlbumSingle';
import CreateSong from './CreateSong';
import Username from "./edits/Username"
import Email from "./edits/Email"
import Gender from "./edits/Gender"
import Age from "./edits/Age"
import Artist from "./edits/Artist"
import Country from "./edits/Country"
import Phone from "./edits/Phone"
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loggedIn: false
    }
  }

  render() {
    const { loggedIn, loaded } = this.state;
      return (
        <Router>
        <div className="App">
          {/* Routes */}
          <Switch>
            <Route exact path="/">
              <Signup></Signup>
            </Route>
            <Route exact path="/Login">
              <Login></Login>
            </Route>
            <Route exact path="/Home">
              <Home></Home>
            </Route>
            <Route exact path="/Home_artist">
              <Home_artist></Home_artist>
            </Route>
            <Route exact path="/Profile_artist">
              <Profile_artist></Profile_artist>
            </Route>
            <Route exact path="/Search_artist">
              <Search_artist></Search_artist>
            </Route>
            <Route exact path="/Username">
              <Username></Username>
            </Route>
            <Route exact path="/Email">
              <Email></Email>
            </Route>
            <Route exact path="/Gender">
              <Gender></Gender>
            </Route>
            <Route exact path="/Age">
              <Age></Age>
            </Route>
            <Route exact path="/Artist">
              <Artist></Artist>
            </Route>
            <Route exact path="/Country">
              <Country></Country>
            </Route>
            <Route exact path="/Phone">
              <Phone></Phone>
            </Route>
            <Route exact path="/Profile">
              <Profile></Profile>
            </Route>
            <Route exact path="/Search">
              <Search></Search>
            </Route>
            <Route exact path="/MyMusic">
              <MyMusic></MyMusic>
            </Route>
            <Route exact path="/MyUpload">
              <MyUpload></MyUpload>
            </Route>
            <Route exact path="/CreateAlbumSingle">
              <CreateAlbumSingle></CreateAlbumSingle>
            </Route>
            <Route exact path="/CreateSong">
              <CreateSong></CreateSong>
            </Route>
            <Route exact path="/Friend">
              <Friend></Friend>
            </Route>
            <Route exact path="/Friend_artist">
              <Friend_artist></Friend_artist>
            </Route>
            <Route exact path="/Friend_info">
              <Friend_info></Friend_info>
            </Route>
            <Route exact path="/Friend_info_artist">
              <Friend_info_artist></Friend_info_artist>
            </Route>
            <Route exact path="/Library">
              <Library></Library>
            </Route>
            <Route exact path="/Library_artist">
              <Library_artist></Library_artist>
            </Route>
            <Route exact path="/Genre">
              <Genre></Genre>
            </Route>
            <Route exact path="/Genre_artist">
              <Genre_artist></Genre_artist>
            </Route>
          </Switch>
        </div>
      </Router>
      );
    }
}
export default App;
