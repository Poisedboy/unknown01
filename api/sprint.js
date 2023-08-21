const express = require("express");
const api = express.Router();
const sprintController = require("../controller/sprintController");
const utility = require("../helper/utility");

api.post("/api/post-sprint", utility.use(sprintController.postSprint));

api.get("/api/:id/sprints", utility.use(sprintController.getSprints));

api.put("/api/update-sprint", utility.use(sprintController.updateSprint));

module.exports = api;
