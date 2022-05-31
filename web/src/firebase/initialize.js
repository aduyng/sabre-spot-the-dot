import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import "firebase/analytics";
import "firebase/messaging";

let initialized = false;

export default ({ config } = {}) => {
  if (!initialized) {
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.analytics();
    initialized = true;
  }

  return firebase;
};
