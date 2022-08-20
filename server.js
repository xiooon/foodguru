const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

const restaurantApi = require("./controller/restaurantController.js");
const userApi = require("./controller/userController.js");
const reviewApi = require("./controller/reviewController.js");
app.use("/api", restaurantApi);
app.use("/api", userApi);
app.use("/api", reviewApi);

app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/register", (req, res) => {
  res.sendFile("/public/register.html", { root: __dirname });
});

app.get("/profile", (req, res) => {
  res.sendFile("/public/profile.html", { root: __dirname });
});

app.get("/login", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/restaurants", (req, res) => {
  res.sendFile("/public/restaurant.html", { root: __dirname });
});

app.get("/restaurant/:id", (req, res) => {
  res.sendFile("/public/restaurant.html", { root: __dirname });
});

app.get("/review/:reviewid/:restaurantid", (req, res) => {
  res.sendFile("/public/review.html", { root: __dirname });
});

app.listen(port, () => console.log('Example app listening on port ${port}!'))

