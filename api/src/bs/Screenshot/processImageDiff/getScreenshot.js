const path = require("path");

module.exports = async ({ knex, name }) => {
  const fileNameWithoutFolder = path.basename(name);
  const screenshotId = fileNameWithoutFolder.split("-").shift();
  console.log(`screenshotId: ${screenshotId}`);
  const screenshot = await knex("Screenshot")
    .where({
      id: screenshotId
    })
    .first();

  console.log(`found the screenshot: ${screenshot.name}`);

  if (!screenshot) {
    throw new Error(`the screenshot id "${screenshotId}" is not found!`);
  }

  return screenshot;
};
