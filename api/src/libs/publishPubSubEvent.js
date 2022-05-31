const { PubSub } = require("@google-cloud/pubsub");
const logger = require("./logger");

module.exports = ({ topic, message = {} }) => {
  const pubsub = new PubSub();
  const messageBody = JSON.stringify(message);
  const buffer = Buffer.from(messageBody);
  const fullTopicName = `projects/${process.env.FIREBASE_PROJECT_ID ||
    process.env.FBASE_PROJECT_ID}/topics/${topic}`;
  logger.log(`about to publish to ${fullTopicName} with body: ${messageBody}`);

  return pubsub
    .topic(fullTopicName)
    .publish(buffer)
    .then(messageId => {
      logger.log(`Message ${messageId} published to topic ${fullTopicName}`);

      return messageId;
    })
    .catch(error => {
      logger.error(`unable to publish to topic ${fullTopicName}, error: ${error}`);
    });
};
