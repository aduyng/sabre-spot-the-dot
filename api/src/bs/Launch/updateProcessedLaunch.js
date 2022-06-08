const {
  LAUNCH_STATUS_COMPLETE,
  LAUNCH_COMPLETE_TIME,
  SCREENSHOT_STATUS_COMPLETE
} = require("../../consts");
const transactionallyExecute = require("../../knex/utils/transactionallyExecute");

module.exports = async () => {
  return transactionallyExecute(async ({ trx }) => {
    const changedLaunchIds = await trx("Launch")
      .update({ status: LAUNCH_STATUS_COMPLETE, updatedAt: Date.now() })
      .where("updatedAt", "<", Date.now() - LAUNCH_COMPLETE_TIME)
      .whereNot("status", LAUNCH_STATUS_COMPLETE)
      .returning("id")
      .pluck("id");
    await trx("Screenshot")
      .update({ status: SCREENSHOT_STATUS_COMPLETE, updatedAt: Date.now() })
      .whereIn("launchId", changedLaunchIds)
      .whereNot("status", LAUNCH_STATUS_COMPLETE);
  });
};
