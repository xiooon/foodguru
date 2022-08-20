const express = require("express");
const router = express.Router();
const model = require("../model/restaurant");

const callback = (error, res, status, result) => {
  if (error) {
    console.log(error);
    return res.status(500).send({ err: error });
  }
  return res.status(status).send(result);
};

router.get("/restaurants", (req, res) => {
  try {
    model.getRestaurants((err, rows) => {
      callback(err, res, 200, rows);
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.get("/restaurants/:id", (req, res) => {
  try {
    const { id } = req.params;
    model.getRestaurant(id, (err, rows) => {
      callback(err, res, 200, rows[0]);
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
