const express = require("express");
const app = express();
// const mysql = require("mysql");
const cors = require("cors");
// const db = require("./models/db");

const user = require("./routes/user")

app.use(cors());
app.use(express.json());

app.use('', user);

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});