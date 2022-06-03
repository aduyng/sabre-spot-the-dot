const { SCREENSHOT_DIR } = require("../../consts");
const getBucket = require("../../firebase/getBucket");

module.exports = async ({ projectId, jobId, launchId, screenshot, throwError = true }) => {
  const screenshotPath = `${SCREENSHOT_DIR}/${projectId}/${jobId}/${launchId}/${screenshot.id}/${screenshot.name}`;
  console.log(`retrieving content of screenshot ${screenshot.id} from ${screenshotPath}`);
  const [content] = await getBucket()
    .file(screenshotPath)
    .download();

  if (!content && throwError) {
    throw new Error(`the golden screenshot "${screenshotPath}" is not found!`);
  }

  return content;
};
