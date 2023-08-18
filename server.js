require("dotenv").config({ path: ".env" });
const express = require("express");
const api = require("./api");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// api
app.use(api);

// serve static react files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

// handle errors from controllers
app.use(function (err, req, res, next) {
  console.error(err);
  const message = err.raw?.message || err.message || err.sqlMessage;
  return res.status(500).send({ message: message });
});

// start server
const server = app.listen(port, async () => {
  console.log("Welcome to Gravity 🚀");
});

module.exports = server;
