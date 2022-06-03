// const Promise = require("bluebird");
// const path = require("path");
// const compareImages = require("resemblejs/compareImages");
// const { RESEMBLE_OPTIONS, UPLOAD_DIR, SCREENSHOT_DIR } = require("../../consts");
const { SCREENSHOT_DIR } = require("../../consts");
const getBucket = require("../../firebase/getBucket");
const getScreenshot = require("./processImageDiff/getScreenshot");
// const getBaseScreenshot = require("./processImageDiff/getBaseScreenshot");

module.exports = async ({ knex, bucket, name, contentType }) => {
  console.log(`[${__filename}] bucket: ${bucket}, name: ${name}, contentType: ${contentType}`);
  const gcsBucket = getBucket();
  const screenshot = await getScreenshot({ knex, name });
  const launch = await knex("Launch")
    .where({ id: screenshot.launchId })
    .first();

  if (launch.isGolden) {
    const destination = `${SCREENSHOT_DIR}/${screenshot.id}-${screenshot.name}`;
    console.log(
      `the launch id: ${launch.id} is the golden launch, moving ${name} to ${destination}`
    );
    return gcsBucket.file(name).move(destination);
  }
  //
  // const {
  //   screenshot: baseScreenshot,
  //   screenshotContent: baseScreenshotContent
  // } = await getBaseScreenshot({ knex, screenshot });
  //
  // const compareResult = await compareImages(
  //   screenshotContent,
  //   baseScreenshotContent,
  //   RESEMBLE_OPTIONS
  // );
  //
  // const fileNameParts = screenshot.name.split(".");
  // const diffFileName = `${fileNameParts[0]}.diff.${fileNameParts[1]}`;
  // const diffFilePath = `${SCREENSHOT_DIR}/${screenshot.id}-${diffFileName}`;
  // await getBucket()
  //   .file(diffFilePath)
  //   .save(compareResult.getBuffer());
  // console.log(`diff file has been saved at ${diffFilePath}`);
  return true;
};
