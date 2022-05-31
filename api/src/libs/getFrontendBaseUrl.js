module.exports = function getFrontendBaseUrl({ relativePath, companyCode }) {
  return `${process.env.STD_FRONTEND_BASE_URL}/${companyCode}/${relativePath}`;
};
