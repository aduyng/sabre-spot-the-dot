const { RESEMBLE_IGNORE_METHODS, RESEMBLE_ERROR_METHODS } = require("../../consts");
const { connectDb } = require("../../knex/knex");
const hasEditorPermission = require("../Project/hasEditorPermission");

module.exports = async ({ config, projectId, jobId, userId }) => {
  const { overlay, ignoreMethod, errorMethod, transparency } = config;
  const auth = await hasEditorPermission({ projectId, userId });
  const newConfig = {};
  if (!auth) {
    throw new Error("Permission denied.");
  }

  const knex = await connectDb();
  const job = knex("Job")
    .where({ id: jobId })
    .first();
  if (!job) {
    throw new Error("Invalid job ID.");
  }

  if (overlay) {
    const rgb = overlay.replace(/[^\d.,]/g, "").split(",");
    const [red, green, blue] = rgb;
    newConfig.overlayRed = red;
    newConfig.overlayGreen = green;
    newConfig.overlayBlue = blue;
  }
  if (ignoreMethod) {
    if (!RESEMBLE_IGNORE_METHODS.includes(ignoreMethod)) {
      throw new Error("Invalid ignore method given.");
    }
    newConfig.ignoreMethod = ignoreMethod;
  }

  if (errorMethod) {
    if (!RESEMBLE_ERROR_METHODS.includes(errorMethod)) {
      throw new Error("Invalid error method given");
    }
    newConfig.errorMethod = errorMethod;
  }

  if (transparency) {
    if (transparency < 0 || transparency > 100) {
      throw new Error("Invalid transparency value - must be between 0 and 100 inclusive");
    }
    newConfig.transparency = transparency;
  }

  await knex("Job")
    .where({ id: jobId })
    .update(newConfig);
};
