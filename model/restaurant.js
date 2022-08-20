const pool = require("../config/db");

function getRestaurants(callback) {
  const sql = `SELECT * FROM restaurant`;
  pool.query(sql, (err, rows) => {
    callback(err, rows);
  });
}

function getRestaurant(restaurant_id, callback) {
  const sql = `SELECT * FROM restaurant WHERE id = ?`;
  pool.query(sql, [restaurant_id], (err, rows) => {
    callback(err, rows);
  });
}

module.exports = { getRestaurant, getRestaurants };
