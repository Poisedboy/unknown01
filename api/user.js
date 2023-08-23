const express = require("express");
const api = express.Router();
const userController = require("../controller/userController");
const utility = require("../helper/utility");

api.put("/api/post-servey", utility.use(userController.postServey));

module.exports = api;
