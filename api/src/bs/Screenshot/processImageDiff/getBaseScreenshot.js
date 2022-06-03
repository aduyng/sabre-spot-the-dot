const { SCREENSHOT_DIR } = require("../../../consts");
const getBucket = require("../../../firebase/getBucket");

module.exports = async ({ knex, screenshot }) => {
  const baseScreenshot = knex("Screenshot")
    .where({ name: screenshot.name })
    .where("launchId", function whereLaunchId() {
      return this.select("id")
        .from("Launch")
        .where({
          isGolden: true
        })
        .where("jobId", function whereJobId() {
          return this.select("jobId")
            .from("Launch")
            .innerJoin("Screenshot", "Launch.id", "Screenshot.launchId")
            .where("Screenshot.id", screenshot.id);
        });
    })
    .first();

  if (!baseScreenshot) {
    throw new Error(`the base screenshot for screenshot id ${screenshot.id} is not found!`);
  }

  const baseScreenshotPath = `${SCREENSHOT_DIR}/${baseScreenshot.id}-${baseScreenshot.name}`;
  const [baseScreenshotContent] = await getBucket()
    .file(baseScreenshotPath)
    .download();
  if (!baseScreenshotContent) {
    throw new Error(`the golden screenshot "${baseScreenshotPath}" is not found!`);
  }

  return { screenshot: baseScreenshot, screenshotContent: baseScreenshotContent };
};
