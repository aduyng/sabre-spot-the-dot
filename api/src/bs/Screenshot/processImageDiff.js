const Promise = require("bluebird");
const compareImages = require("resemblejs/compareImages");
const {
  SCREENSHOT_DIR,
  RESEMBLE_OPTIONS,
  SCREENSHOT_STATUS_PROCESSING,
  SCREENSHOT_STATUS_COMPLETE,
  UPLOAD_DIR
} = require("../../consts");
const getBucket = require("../../firebase/getBucket");
const getScreenshot = require("./processImageDiff/getScreenshot");
const getBaseScreenshot = require("./processImageDiff/getBaseScreenshot");
const getScreenshotContent = require("./getScreenshotContent");

module.exports = async ({ knex, bucket, name, contentType }) => {
  console.log(`[${__filename}] bucket: ${bucket}, name: ${name}, contentType: ${contentType}`);
  const [projectId, jobId, launchId, screenshotId] = name.replace(`${UPLOAD_DIR}/`, "").split("/");
  const gcsBucket = getBucket();
  const screenshot = await getScreenshot({ knex, screenshotId });
  await knex("Screenshot")
    .update({
      status: SCREENSHOT_STATUS_PROCESSING,
      updatedAt: Date.now()
    })
    .where({ id: screenshot.id });

  const launch = await knex("Launch")
    .where({ id: screenshot.launchId })
    .first();

  if (launch.isGolden) {
    const destination = `${SCREENSHOT_DIR}/${projectId}/${jobId}/${launchId}/${screenshot.id}/${screenshot.name}`;
    console.log(
      `the launch id: ${launch.id} is the golden launch, moving ${name} to ${destination}`
    );
    return gcsBucket.file(name).move(destination);
  }
  const baseScreenshot = await getBaseScreenshot({ knex, screenshot });
  if (!baseScreenshot) {
    console.log(`the base screenshot of ${screenshot.id} is not found, this is a new screenshot`);
    return false;
  }
  const destination = `${SCREENSHOT_DIR}/${projectId}/${jobId}/${launchId}/${screenshot.id}/${screenshot.name}`;
  await gcsBucket.file(name).move(destination);
  console.log(`the screenshot ${name} has been moved to ${destination}`);

  const [screenshotContent, baseScreenshotContent] = await Promise.all([
    getScreenshotContent({ projectId, jobId, launchId, screenshot, throwError: true }),
    getScreenshotContent({
      projectId,
      jobId,
      launchId,
      screenshot: baseScreenshot,
      throwError: true
    })
  ]);

  console.log(`got the base and the screenshot, start the comparison`);

  const compareResult = await compareImages(
    screenshotContent,
    baseScreenshotContent,
    RESEMBLE_OPTIONS
  );

  const fileNameParts = screenshot.name.split(".");
  const extension = fileNameParts.pop();
  const diffFileName = `${fileNameParts.join(".")}.diff.${extension}`;
  const diffFilePath = `/${projectId}/${jobId}/${launchId}/${screenshot.id}/${diffFileName}`;
  await getBucket()
    .file(diffFilePath)
    .save(compareResult.getBuffer());
  const diffPercentage = Math.round(parseFloat(compareResult.rawMisMatchPercentage) * 100);
  console.log(`diff file has been saved at ${diffFilePath}, diffPercentage: ${diffPercentage}`);
  await knex("Screenshot")
    .update({
      diff: diffFileName,
      diffPercentage,
      status: SCREENSHOT_STATUS_COMPLETE,
      updatedAt: Date.now()
    })
    .where({ id: screenshot.id });
  return true;
};
