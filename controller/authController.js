const { auth } = require("../services/authService");
const { validation } = require("../services/authService");

exports.signin = async function (req, res) {
  const user = req.body;

  const registeredUser = await auth(user);

  return res
    .status(200)
    .send({ message: "Hello from server!!!", user: registeredUser });
};
