const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  //port: "8889",
  //host: "database-master",
  port: "3306",
  user: "root",
  password: "root",
  database: "isee",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected DB!");
});

module.exports= con
