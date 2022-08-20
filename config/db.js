var mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "12345678",
  user: "admin",
  database: "food_guru",
  host: "gamereview.cwwgwxgzzts7.us-east-1.rds.amazonaws.com",
  port: '3306'
});

module.exports = pool;
