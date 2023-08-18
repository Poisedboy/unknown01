const express = require("express");
const api = express.Router();
const sprintController = require("../controller/userController");
const utility = require("../helper/utility");

api.post("/api/post-sprint", utility.use(sprintController.postSprint));

module.exports = api;
