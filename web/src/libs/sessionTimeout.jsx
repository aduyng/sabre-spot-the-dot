import { SESSION_TIMEOUT } from "../consts";

let timeoutHandler;
let onTimeout;

function setOnTimeoutCallback(timeoutCallback) {
  onTimeout = timeoutCallback;
}

function stop() {
  if (timeoutHandler) {
    return clearTimeout(timeoutHandler);
  }
  return false;
}

function start() {
  stop();
  timeoutHandler = setTimeout(() => {
    onTimeout();
  }, SESSION_TIMEOUT);
}

function extend() {
  stop();
  timeoutHandler = setTimeout(() => {
    onTimeout();
  }, SESSION_TIMEOUT);
}

export default {
  setOnTimeoutCallback,
  start,
  stop,
  extend
};
