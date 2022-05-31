// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  databaseURL: "https://sabre-spot-the-dot-default-rtdb.firebaseio.com",
  measurementId: "G-P7HN02PBQ0",
  apiKey: "AIzaSyDbPR1cFfplX8xbKZ46TqUv6AFiB_8eivc",
  authDomain: "sabre-spot-the-dot.firebaseapp.com",
  projectId: "sabre-spot-the-dot",
  storageBucket: "sabre-spot-the-dot.appspot.com",
  messagingSenderId: "205994041605",
  appId: "1:205994041605:web:351f22746a1aed31eb976c"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body
  };
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
