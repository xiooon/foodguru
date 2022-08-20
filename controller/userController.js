const express = require("express");
const router = express.Router();
const model = require("../model/user");

const callback = (error, res, status, result) => {
  if (error) {
    console.log(error);
    return res.status(500).send({ err: error });
  }
  return res.status(status).send(result);
};

router.post("/signup", (req, res) => {
  const {
    username,
    email,
    password,
    gender,
    address,
    mobile,
    first_name,
    last_name,
  } = req.body;
  if (
    !email ||
    !password ||
    !username ||
    !gender ||
    !first_name ||
    !last_name
  ) {
    return res.status(400).send({ error: "Please enter all required fields." });
  }

  model.getUserByUsername(username, (err, rows) => {
    if (rows.length !== 0) {
      return res.status(400).send({
        error: "An account already exists with that username.",
      });
    } else {
      model.insertIntoUser(
        {
          username,
          email,
          password,
          address,
          gender,
          first_name,
          last_name,
          mobile,
        },
        (err, rows) => {
          callback(err, res, 201, { userid: rows ? rows.insertId : 0 });
        }
      );
    }
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!password || !username) {
    return res.status(400).send({ error: "Please enter all fields." });
  }
  model.getUserByUsernameAndPassword(username, password, (err, rows) => {
    if (rows.length == 0) {
      return res.status(400).send({
        error: "Your username or password is wrong.",
      });
    } else {
      return res.status(200).send(rows[0]);
    }
  });
});

router.get("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    model.getUser(id, (err, rows) => {
      callback(err, res, 200, rows[0]);
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
