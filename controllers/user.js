// Requiring the necessary libraries.
const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

// The passwords will be encrypted using this keyword.
const accessTokenSecret = 'secret';

const home = (req, res) => {
  res.json({ message: "Welcome to server." });
};

// This method is to create the users.
const createUser = async(req, res) => {
  console.log(req.body);
  const user_id = req.body.user_id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  db.query(
    "INSERT INTO users (user_id, username, email, password) VALUES (?,?,?,?)",
    [user_id, username, email, encryptedPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

// This method is to create the users.
const createArtist = (req, res) => {
  console.log(req.body);
  const artist_id = req.body.artist_id;
  const artist_name = req.body.artist_name;

  db.query(
    "INSERT INTO artists (artist_id, artist_name) VALUES (?,?)",
    [artist_id, artist_name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

// This method is to create the users.
const createAlbum = (req, res) => {
  console.log(req.body);
  const album_id = req.body.id_album;
  const artist_id = req.body.artist_id;
  const album_name = req.body.album_name;
  const year = req.body.year;
  const img_src = req.body.img_src;

  db.query(
    "INSERT INTO albums (album_id, artist_id, album_name, year, img_src) VALUES (?,?,?,?,?)",
    [album_id, artist_id, album_name, year, img_src],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const album_id = result.insertId;
        res.send({album_id});
      }
    }
  );
};

// This method is to create the users.
const createSong = (req, res) => {
  console.log("=====================================")
  console.log(req.body);
  const song_id = req.body.song_id;
  const album_id = req.body.album_id;
  const song_name = req.body.song_name;
  const genre_id = req.body.genre_id;
  const song_src = req.body.song_src

  db.query(
    "INSERT INTO vol.songs (song_id, album_id, song_name, genre_id, song_src) VALUES (?,?,?,?,?)",
    [song_id, album_id, song_name, genre_id, song_src],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

// This method is to create a friend.
const friends = (req, res) => {
  console.log(req.body);
  const sender_id = req.body.sender_id;
  const receiver_id = req.body.receiver_id;

  db.query(
    "INSERT INTO friends (sender_id, receiver_id) VALUES (?,?)",
    [sender_id, receiver_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

// This method is to create a friend request.
const friendRequest = (req, res) => {
  console.log(req.body);
  const sender_id = req.body.sender_id;
  const receiver_id = req.body.receiver_id;
  const approval = null;

  db.query(
    "INSERT INTO friend_request (sender_id, receiver_id, approval) VALUES (?,?,?)",
    [sender_id, receiver_id, approval],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};


// This method is to edit the gender.
const editGender = async(req, res) => {
    const user_id = req.body.user_id;
    const gender = req.body.gender;
    db.query(
      "UPDATE users SET gender = ? WHERE user_id = ?",
      [gender, user_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  };

// This method is to edit the age.
const editAge = async(req, res) => {
  const user_id = req.body.user_id;
  const age = req.body.age;
  db.query(
    "UPDATE users SET age = ? WHERE user_id = ?",
    [age, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// This method is to edit the country.
const editCountry = async(req, res) => {
  const user_id = req.body.user_id;
  const country = req.body.country;
  db.query(
    "UPDATE users SET country = ? WHERE user_id = ?",
    [country, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// This method is to edit the phone number.
const editPhone = async(req, res) => {
  const user_id = req.body.user_id;
  const phone = req.body.phone;
  db.query(
    "UPDATE users SET phone = ? WHERE user_id = ?",
    [phone, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// This method is to edit the user's artist status.
const editArtist = async(req, res) => {
  const user_id = req.body.user_id;
  const artist = req.body.artist;
  db.query(
    "UPDATE users SET artist = ? WHERE user_id = ?",
    [artist, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// This method is to login.
const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT password, user_id, artist FROM users WHERE username=? ",
    username,
    async function (error, results) {
      console.log(results[0]);
      if (error) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } 
      else {
        if(results) {
          const comparison = await bcrypt.compare(
            password,
            results[0].password
          );
          if(comparison) {
            const accessToken = jwt.sign({username: username, user_id: results[0].user_id, artist: results[0].artist }, accessTokenSecret);
            res.send({
              code: 200,
              accessToken,
              success: "login successful",
            });
          } 
          else {
            res.send({
              code: 204,
              error: "Username and password does not match",
            });
          }
        }
        else{
          res.send({
            "code":206,
            "error": "Username does not exist"
          })
        }
      }
    }
  );
};

// This method is to get the users from the database.
const getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// This method is to get the users from the database.
const getAlbums = (req, res) => {
  const artist_id = req.params.artist_id;
  console.log(artist_id)
  db.query("SELECT * FROM albums where artist_id = ?",artist_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// This method is to get the artists from the database.
const getArtists = (req, res) => {
  db.query("SELECT * FROM artists", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// This method is to get the artists from the database.
const getArtistName = (req, res) => {
  const artist_id = req.body.artist_id;
  db.query("SELECT artist_name FROM artists where artist_id = ?", artist_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // res.send(result,{ "code":200});
      res.send(result);
    }
  });
};

const user = (req, res) => {
  const user_id = req.body.user_id;
  // console.log(user_id);
  db.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (err, result) => {
      if(err){
        res.json({ message: err });
        console.log(err);
      } 
      else{
        res.json(result);
      }
    }
  );
};

const searchUser = (req, res) => {
  const keyword = req.body.username;
  const sender_id = req.body.sender_id;
  db.query(
    "SELECT user_id, username FROM users WHERE username like ? and user_id <> ?",[
    "%" + keyword + "%",
    sender_id],
    (err, result) => {
      if (err) {
        res.json({ message: err });
        console.log(err);
      } else {
        console.log(result);
        res.json( result );
      }
    }
  );
};

const searchArtist = (req, res) => {
  const artist_id = req.body.id;
  db.query(
    "SELECT artist_name FROM artists WHERE artist_id = ?",
    artist_id,
    (err, result) => {
      if (err) {
        res.json({ message: err });
        console.log(err);
      } else {
        console.log("result", result);
        res.json( result );
      }
    }
  );
};

const searchTrack = (req, res) => {
  const keyword = req.body.song_name;
  db.query(
    "SELECT s.song_name, al.album_name, ar.artist_name, s.song_src, s.song_id FROM vol.songs s left join vol.albums al on s.album_id = al.album_id left join vol.artists ar on al.artist_id = ar.artist_id where s.song_name like ?","%" + keyword + "%",
    (err, result) => {
      if (err) {
        res.json({ message: err });
        console.log(err);
      } else {
        console.log(result);
        res.json( result );
      }
    }
  );
};

// This method is to get the users from the database.
const getFriendRequests = (req, res) => {
  const receiver_id = req.body.receiver_id;
  db.query("SELECT fr.sender_id, u.username FROM vol.friend_request fr left join vol.users u on fr.sender_id = u.user_id where fr.receiver_id = ?",receiver_id, 
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

// This method is to get the friends from the database.
const getFriends = (req, res) => {
  const user_id = req.body.receiver_id;
  console.log(req.body)
  console.log("user_id",user_id)
  db.query("SELECT IF(sender_id=?, receiver_id, sender_id) AS friend FROM friends WHERE sender_id=? OR receiver_id=?",[user_id, user_id, user_id],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const acceptRequest = (req, res) => {
  const receiver_id = req.body.receiver_id;
  const sender_id = req.body.sender_id;
  db.query("DELETE from vol.friend_request WHERE receiver_id = ? and sender_id = ?",[ receiver_id, sender_id],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query("INSERT INTO friends (sender_id, receiver_id) VALUES (?,?)",
          [sender_id, receiver_id],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Values Inserted");
            }
          }
        );
    }
  });
};

const declineRequest = (req, res) => {
  const receiver_id = req.body.receiver_id;
  const sender_id = req.body.sender_id;
  db.query("DELETE from vol.friend_request WHERE receiver_id = ? and sender_id = ?",[ receiver_id, sender_id],
  (err, result) => {
    if (err) {
    } else {
      res.send("Values Inserted");
    }
  });
};

// This method is to get the users from the database.
const getUsersWithId = (req, res) => {
  const user_id = req.body.user_id;
  db.query("SELECT username FROM users WHERE user_id = ?",user_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// This method is to get the genres from the database.
const getGenres = (req, res) => {
  db.query("SELECT * FROM genres", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const getAlbumInfo = (req, res) => {
  const album_id = req.body.album_id;
  db.query("SELECT * FROM albums WHERE album_id = ?",album_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const getSongs = (req, res) => {
  const album_id = req.body.album_id;
  db.query("SELECT * FROM songs WHERE album_id = ?",album_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};




// This method is to get songs by genre.
const getSongsByGenre = (req, res) => {
  const genre_id = req.body.genre_id;
  db.query("SELECT s.song_name, s.song_src, al.album_name, ar.artist_name FROM vol.genres g JOIN vol.songs s ON g.genre_id = s.genre_id JOIN vol.albums al ON al.album_id = s.album_id JOIN vol.artists ar ON ar.artist_id = al.artist_id WHERE g.genre_id = ?", genre_id,
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};
// This method is to create a friend request.
const likeSong = (req, res) => {
  const user_id = req.body.user_id;
  const song_id = req.body.song_id;

  db.query(
    "INSERT INTO liked_songs (user_id, song_id) VALUES (?,?)",
    [user_id, song_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

const getLikedSongs =(req, res) => {
  const user_id = req.body.user_id;
  db.query(
    "SELECT s.song_name, s.song_src, a.album_name, ar.artist_name FROM vol.liked_songs l left join vol.songs s on l.song_id = s.song_id left join vol.albums a on s.album_id = a.album_id left join vol.artists ar on a.artist_id = ar.artist_id where l.user_id = ?",
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};





module.exports = {
  home,
  createUser,
  getUsers,
  getAlbums,
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
  getArtists,
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
};
