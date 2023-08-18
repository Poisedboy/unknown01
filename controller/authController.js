const { auth } = require("../services/authService");

exports.signin = async function (req, res) {
  const user = req.body;
  const registeredUser = await auth(user);
  console.log("inside Controller", registeredUser);

  return res
    .status(200)
    .send({ message: "Hello from server!!!", user: registeredUser });
};
