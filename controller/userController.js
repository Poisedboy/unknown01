const { updateUserServey } = require("../services/userService");

exports.postServey = async function (req, res) {
  const options = req.body;
  const requestToDB = await updateUserServey(options);
  return res.status(200).send(requestToDB);
};
