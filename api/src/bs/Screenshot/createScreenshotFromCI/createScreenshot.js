const { SCREENSHOT_STATUS_CREATED } = require("../../../consts");

module.exports = async ({ trx, launch, fileName, creator }) => {
  const [createdScreenshot] = await trx("Screenshot")
    .insert({
      launchId: launch.id,
      name: fileName,
      status: SCREENSHOT_STATUS_CREATED,
      createdAt: Date.now(),
      createdByUserId: creator.id
    })
    .returning("*");

  return createdScreenshot;
};
