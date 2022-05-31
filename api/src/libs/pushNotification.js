const { initializeFirebase } = require("../firebase/initialize");
const logger = require("./logger");

module.exports = ({ title, body, url, tokens = [] }) => {
  const admin = initializeFirebase();
  const message = {
    data: {
      title,
      body,
      url
    },
    tokens
  };

  return admin
    .messaging()
    .sendMulticast(message)
    .then(response => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokens[idx]);
          }
        });
        logger.log(`List of tokens that caused failures: ${failedTokens}`);
      }
    });
};
