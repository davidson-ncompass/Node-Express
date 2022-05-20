const mysql = require("mysql2");
require("dotenv").config();
const config = require("../config.json");

// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });
const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
});
connection.connect((err) => {
  if (!err) {
    console.log("DB connected");
  } else {
    console.log(err.message);
  }
});

module.exports = { connection };
