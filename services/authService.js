const db = require("../db/db");

exports.auth = async function (user) {
  console.log(user);
  try {
    if (user.token) {
      const newUser = {
        google_id: user.id,
        email: user.email,
        name: user.name,
        given_name: user.given_name,
        family_name: user.family_name,
        picture: user.picture,
      };
      const userFromDB = await db("users").select().where("email", user.email);
      if (!userFromDB) {
        const putUser = await db("users").insert(newUser);
        return putUser;
      }
      console.log("Inside service", userFromDB);
      return userFromDB;
    }
  } catch (e) {
    console.log("Error ", e);
  }
};
