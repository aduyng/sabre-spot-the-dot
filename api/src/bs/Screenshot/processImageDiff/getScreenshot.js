const path = require("path");

module.exports = async ({ knex, name }) => {
  const fileNameWithoutFolder = path.basename(name);
  const screenshotId = fileNameWithoutFolder.split("-").shift();

  const screenshot = await knex("Screenshot")
    .where({
      id: screenshotId
    })
    .first();

  if (!screenshot) {
    throw new Error(`the screenshot id "${screenshotId}" is not found!`);
  }

  return screenshot;
};
