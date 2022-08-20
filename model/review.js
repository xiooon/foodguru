const pool = require("../config/db");

function getReview(review_id, callback) {
  const sql = `SELECT * FROM review WHERE id = ?`;
  pool.query(sql, [review_id], (err, rows) => {
    callback(err, rows);
  });
}

function getReviewsByRestaurant(id, callback) {
  const sql = `SELECT R.id, R.review_RestaurantId, R.comments, R.review_UserId, R.restaurantRating, R.restaurantRating, R.priceRating, R.serviceRating, A.username, R.datePosted FROM review R INNER JOIN account A ON R.review_UserId = A.id WHERE review_RestaurantId = ?`;
  pool.query(sql, [id], (err, rows) => {
    callback(err, rows);
  });
}

function insertIntoReview(review, callback) {
  const sql = `INSERT INTO review (review_RestaurantId, comments, review_UserId, restaurantRating, priceRating, serviceRating, datePosted) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  pool.query(
    sql,
    [
      review.review_RestaurantId,
      review.comments,
      review.review_UserId,
      review.restaurantRating,
      review.priceRating,
      review.serviceRating,
      review.datePosted,
    ],
    (err, rows) => {
      callback(err, rows);
    }
  );
}

function updateReview(review, callback) {
  const sql = `UPDATE review SET restaurantRating = ?, priceRating = ?, serviceRating = ?, comments = ? WHERE id = ?`;
  pool.query(
    sql,
    [
      review.restaurantRating,
      review.priceRating,
      review.serviceRating,
      review.comments,
      review.id,
    ],
    (err, rows) => {
      callback(err, rows);
    }
  );
}

function deleteReview(id, callback) {
  const sql = `DELETE FROM review WHERE id = ?`;
  pool.query(sql, [id], (err, rows) => {
    callback(err, rows);
  });
}

module.exports = {
  deleteReview,
  getReview,
  getReviewsByRestaurant,
  updateReview,
  insertIntoReview,
};
