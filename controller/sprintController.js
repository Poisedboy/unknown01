const {
  postSprint,
  fetchSprints,
  updateSprintInDb,
} = require("../services/sprintService");

exports.postSprint = async function (req, res) {
  const sprint = req.body;
  const getSavedSprint = await postSprint(sprint);
  return res.status(200).send(getSavedSprint);
};

exports.getSprints = async function (req, res) {
  const userId = req.params.id;
  const sprints = await fetchSprints(userId);
  return res.status(200).send(sprints);
};

exports.updateSprint = async function (req, res) {
  const updatedSprint = req.body;
  const editedSprint = await updateSprintInDb(updatedSprint);
  return res
    .status(200)
    .send({ message: "updated sprint in db!!!", obj: editedSprint });
};
