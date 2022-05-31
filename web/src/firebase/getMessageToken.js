import firebase from "firebase/app";

export default () => {
  const messaging = firebase.messaging();
  return messaging
    .getToken({
      vapidKey:
        "BOy0ClutCObnrdJfHWdqrMIx63LH-q6CUBLwpO2uCL8DDpdcdyqu-O3LfOd_0Kapcp30rH72wJzq1BCI2AbpXYs"
    })
    .then(currentToken => {
      if (currentToken) {
        return currentToken;
      }
      return null;
    })
    .catch(() => {
      return null;
    });
};
