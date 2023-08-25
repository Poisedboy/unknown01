const db = require("../db/db");

exports.updateUserServey = async function (data) {
  try {
    const { options, userId } = data;
    const optionsServey = `${options[0]} ${options[1]}`;
    const updatedInDb = await db.from("users").where({ id: userId }).update({
      options_servey: optionsServey,
    });
    const user = await db.from("users").where({ id: userId }).select().first();
    return user;
  } catch (e) {
    console.log(e);
  }
};
