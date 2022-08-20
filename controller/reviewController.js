const express = require("express");
const router = express.Router();
const moment = require("moment");
const model = require("../model/review");

const callback = (error, res, status, result) => {
  if (error) {
    console.log(error);
    return res.status(500).send({ err: error });
  }
  return res.status(status).send(result);
};

router.put("/reviews/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { restaurantRating, priceRating, serviceRating, comments } = req.body;
    model.updateReview(
      { restaurantRating, priceRating, serviceRating, comments, id },
      (err, rows) => {
        callback(err, res, 200, rows);
      }
    );
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.get("/reviews/restaurant/:id", (req, res) => {
  try {
    const { id } = req.params;
    model.getReviewsByRestaurant(id, (err, rows) => {
      callback(err, res, 200, rows);
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.delete("/reviews/:id", (req, res) => {
  try {
    const { id } = req.params;
    model.deleteReview(id, (err, rows) => {
      callback(err, res, 200, rows);
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.get("/reviews/:id", (req, res) => {
  try {
    const { id } = req.params;
    model.getReview(id, (err, rows) => {
      callback(err, res, 200, rows[0]);
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post("/reviews", (req, res) => {
  try {
    const {
      review_RestaurantId,
      review_UserId,
      priceRating,
      serviceRating,
      restaurantRating,
      comments,
    } = req.body;
    const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    model.insertIntoReview(
      {
        review_RestaurantId,
        review_UserId,
        priceRating,
        serviceRating,
        restaurantRating,
        comments,
        datePosted: date,
      },
      (err, rows) => {
        callback(err, res, 201, {
          review_RestaurantId: review_RestaurantId,
          review_UserId: review_UserId,
        });
      }
    );
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
