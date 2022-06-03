const { connectDb } = require("../../knex/knex");
const { ROLE_ID_EDITOR, ROLE_ID_OWNER, UPLOAD_DIR } = require("../../consts");
const transactionallyExecute = require("../../knex/utils/transactionallyExecute");
const ensureJob = require("./createScreenshotFromCI/ensureJob");
const ensureLaunch = require("./createScreenshotFromCI/ensureLaunch");
const createScreenshot = require("./createScreenshotFromCI/createScreenshot");
const getScreenshotUploadUrl = require("./createScreenshotFromCI/getScreenshotUploadUrl");

module.exports = async ({
  projectId,
  fileName,
  buildUrl,
  buildNumber,
  buildName,
  jobName,
  jobUrl,
  commit,
  branch,
  creator
}) => {
  const knex = await connectDb();

  const project = await knex("Project")
    .innerJoin("UserProjectRole", "Project.id", "UserProjectRole.projectId")
    .where("Project.id", projectId)
    .whereIn("UserProjectRole.roleId", [ROLE_ID_EDITOR, ROLE_ID_OWNER])
    .first();
  if (!project) {
    throw new Error("permission denied");
  }

  return transactionallyExecute(async ({ trx }) => {
    const job = await ensureJob({ projectId, trx, jobName, jobUrl, creator });
    const launch = await ensureLaunch({
      trx,
      job,
      buildUrl,
      buildNumber,
      buildName,
      commit,
      branch,
      creator
    });

    const screenshot = await createScreenshot({ trx, fileName, launch, creator });

    const filePath = `${UPLOAD_DIR}/${screenshot.id}-${fileName}`;
    return getScreenshotUploadUrl({ filePath });
  });
};
