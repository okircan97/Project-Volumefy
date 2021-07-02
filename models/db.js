// This file is to connect to the database.
// (Do not forget to change the password while connecting 
// to a different local host.)
const mysql = require("mysql2");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "40302010Add",
    database: "vol",
  });

  module.exports = db;