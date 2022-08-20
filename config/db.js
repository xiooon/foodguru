var mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "cdev",
  user: "root",
  database: "food_guru",
  host: "localhost",
  port: '3306'
});

module.exports = pool;
