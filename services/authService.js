const db = require("../db/db");
const { OAuth2Client } = require("google-auth-library");

exports.auth = async function (user) {
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
      const userFromDB = await db
        .select()
        .from("users")
        .where("email", user.email)
        .first();
      if (!userFromDB) {
        const putUser = await db.insert(newUser).into("users");
        const getUser = await db
          .select()
          .from("users")
          .where("id", putUser[0])
          .first();

        return getUser;
      }
      return userFromDB;
    }
  } catch (e) {
    console.log("Error ", e);
  }
};
