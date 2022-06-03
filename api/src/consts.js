const ROLE_ID_OWNER = "1";
const ROLE_ID_EDITOR = "2";
const ROLE_ID_VIEWER = "3";

const JOB_STATUS_CREATED = "created";
const JOB_STATUS_IN_PROGRESS = "in-progress";
const JOB_STATUS_STOPPED = "stopped";

const LAUNCH_STATUS_CREATED = "created";
const LAUNCH_STATUS_IN_PROGRESS = "in-progress";
const LAUNCH_STATUS_COMPLETE = "complete";
const LAUNCH_STATUS_ERROR = "error";
const LAUNCH_STATUS_TERMINATED = "terminated";

const SCREENSHOT_STATUS_CREATED = "created";
const SCREENSHOT_STATUS_PROCESSING = "processing";
const SCREENSHOT_STATUS_COMPLETE = "complete";

const UPLOAD_DIR = "uploads";
const SCREENSHOT_DIR = "screenshots";

const RESEMBLE_OPTIONS = {
  ignore: "antialiasing",
  output: {
    errorColor: {
      blue: 255,
      green: 0,
      red: 255
    },
    errorType: "movement",
    outputDiff: true
  },
  scaleToSameSize: true
};

module.exports = {
  FIREBASE_DOWNLOAD_URL: `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/`,
  FIREBASE_STORAGE_TEMPORARY_FOLDER: "tmp/",
  FIREBASE_STORAGE_TEMPORARY_LIFETIME_IN_DAYS: 5,
  ROLE_ID_EDITOR,
  ROLE_ID_VIEWER,
  ROLE_ID_OWNER,
  JOB_STATUS_CREATED,
  JOB_STATUS_IN_PROGRESS,
  JOB_STATUS_STOPPED,
  LAUNCH_STATUS_CREATED,
  LAUNCH_STATUS_IN_PROGRESS,
  LAUNCH_STATUS_COMPLETE,
  LAUNCH_STATUS_ERROR,
  LAUNCH_STATUS_TERMINATED,
  SCREENSHOT_STATUS_CREATED,
  SCREENSHOT_STATUS_PROCESSING,
  SCREENSHOT_STATUS_COMPLETE,
  UPLOAD_DIR,
  RESEMBLE_OPTIONS,
  SCREENSHOT_DIR
};
