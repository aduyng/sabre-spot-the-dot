module.exports = async ({ bucket, name, contentType }) => {
  console.log(`[${__filename}] bucket: ${bucket}, name: ${name}, contentType: ${contentType}`);
};
