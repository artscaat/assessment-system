const mysql = require("mysql2");
// const mysql = require("mysql2/promise");
require("dotenv").config();
// create the connection to database

const host = process.env.DB_HOST;
const databaseName = process.env.DATABASE
const userDB = process.env.DB_USER
const pass = process.env.PASS

const db_config = {
  host: host,
  user: userDB,
  database: databaseName,
  password: pass,
}

// const connection = mysql.createConnection(db_config);
const pool = mysql.createPool(db_config);

pool.query("SELECT * FROM tbpmecourse", (err, data) => {
  if (err) throw('error when connecting to db:', err)
  console.log("Connection to database established");
});
// if(!connection) {
//   console.log("Connection to database failed");
//   setTimeout(connection, 2000); 
// } else {
//   connection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(connection, 2000); 
//     }                                     
//   });  
//   console.log("Connection to database established")
// }
module.exports = pool;