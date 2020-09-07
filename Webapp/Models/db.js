require('dotenv').config();
const mysql = require('mysql');


//DB connection pool
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB
});


exports.connection =  connection;
