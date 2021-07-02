// This file is to define routes for the methods
// inside the controller. (other user.js)

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  home,
  createUser,
  getUsers,
  getAlbums,
  getArtists,
  loginUser,
  user,
  searchUser,
  editGender,
  editAge,
  editCountry,
  editPhone,
  editArtist,
  createArtist,
  createAlbum,
  createSong,
  searchTrack,
  searchArtist,
  getArtistName,
  friends,
  friendRequest,
  getFriendRequests,
  acceptRequest,
  declineRequest,
  getFriends,
  getUsersWithId,
  getGenres,
  getAlbumInfo,
  getSongs,
  getSongsByGenre,
  likeSong,
  getLikedSongs
} = require("../controllers/user");

router.get("/", home);
router.post("/create", createUser);
router.post("/accept", acceptRequest);
router.post("/decline", declineRequest);
router.post("/login", loginUser);
router.post("/searchUser", searchUser);
router.post("/searchTrack", searchTrack);
router.post("/getFriendRequests", getFriendRequests);
router.post("/getFriends", getFriends);
router.post("/getGenres", getGenres);
router.post("/searchArtist", searchArtist);
router.post("/getUsersWithId", getUsersWithId);
router.post("/getSongs", getSongs);
router.post("/getSongsByGenre", getSongsByGenre);
router.post("/user", user);
router.post("/friends", friends);
router.post("/friendRequest", friendRequest);
router.get("/users", getUsers);
router.get("/albums/:artist_id", getAlbums);
router.get("/artists", getArtists);
router.post("/artist_name", getArtistName);
router.post("/getAlbumInfo", getAlbumInfo);
router.put("/editGender", editGender);
router.put("/editAge", editAge);
router.put("/editCountry", editCountry);
router.put("/editPhone", editPhone);
router.put("/editArtist", editArtist);
router.post("/createArtist", createArtist);
router.post("/createAlbum", createAlbum);
router.post("/createSong", createSong);
router.post("/likeSong", likeSong);
router.post("/getLikedSongs", getLikedSongs);
module.exports = router;