const db = require("../db/db");

exports.postSprint = async function (sprint) {
  try {
    const { userId } = sprint;
    if (userId) {
      const newSprint = {
        content: sprint.content,
        duration: sprint.duration,
        speed: sprint.speed,
        count_words: sprint.countWords,
        title: sprint.title,
        project: sprint.project,
        emotion: sprint.emotion,
        user_id: sprint.userId,
      };
      const savedSprintId = await db.insert(newSprint).into("sprints");
      return { notice: `sprint was created with id ${savedSprintId}` };
    } else if (!userId) {
      throw new Error("Not Authenticated User!");
    } else {
      throw new Error("Some ERROR`s just happened!");
    }
  } catch (e) {
    console.log("Error ", e);
  }
};

exports.fetchSprints = async function (userId) {
  try {
    if (userId) {
      const sprints = await db
        .select()
        .from("sprints")
        .where("user_id", userId);
      return sprints;
    }
  } catch (e) {
    console.log("Error getSprints", e);
  }
};

exports.updateSprintInDb = async function (updatedSprint) {
  try {
    const { user_id, id } = updatedSprint;
    const updatedInDb = await db
      .from("sprints")
      .where({ id: id })
      .andWhere({ user_id: user_id })
      .update({
        title: updatedSprint.title,
        content: updatedSprint.content,
      });
    return updatedInDb;
  } catch (e) {
    console.log("Error updateSprintInDb: ", e);
  }
};
