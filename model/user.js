const pool = require("../config/db");

function getUserByUsername(username, callback) {
  const sql = `SELECT * FROM account WHERE username = ?`;
  pool.query(sql, [username], (err, rows) => {
    callback(err, rows);
  });
}

function getUserByUsernameAndPassword(username, password, callback) {
  const sql = `SELECT * FROM account WHERE username = ? AND password = ?`;
  pool.query(sql, [username, password], (err, rows) => {
    callback(err, rows);
  });
}

function insertIntoUser(user, callback) {
  const sql = `INSERT INTO account (username, email, password, address, mobile, gender, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  pool.query(
    sql,
    [
      user.username,
      user.email,
      user.password,
      user.address,
      user.mobile,
      user.gender,
      user.first_name,
      user.last_name,
    ],
    (err, rows) => {
      callback(err, rows);
    }
  );
}

module.exports = {
  getUserByUsername,
  getUserByUsernameAndPassword,
  insertIntoUser,
};
