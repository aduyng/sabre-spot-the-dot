const path = require("path");
const getBucket = require("../firebase/getBucket");

module.exports = ({ tmpFileUrl, folderPath }) => {
  if (tmpFileUrl) {
    const tempFileName = path.basename(tmpFileUrl);
    const targetFileUrl = `${folderPath}/${tempFileName}`;
    return getBucket()
      .file(tmpFileUrl)
      .move(targetFileUrl)
      .then(() => targetFileUrl);
  }
  return null;
};
