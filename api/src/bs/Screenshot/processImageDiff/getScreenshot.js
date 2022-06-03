module.exports = async ({ knex, screenshotId }) => {
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
