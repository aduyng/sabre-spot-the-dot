import React, { useEffect, useState } from "react";
import keyBy from "lodash/keyBy";
import get from "lodash/get";
import { useApolloClient } from "@apollo/react-hooks";
import { ErrorBoundary } from "react-error-boundary";
import Router from "../../../../router/Router";
import SessionContext from "../../../../contexts/SessionContext";
import initializeFirebase from "../../../../firebase/initialize";
import PageLoader from "../../../PageLoader";
import getStorage, { initializeStorage } from "../../../../libs/storage";
import ErrorFallback from "../../../ErrorFallback/ErrorFallback";
import GET_SESSION from "./GET_SESSION.gql";

let firebase;

function onAuthStateChange(callback) {
  return firebase.auth().onIdTokenChanged(signedInUser => {
    if (signedInUser) {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(token => {
          const storage = getStorage();
          storage.setItem("token", token);
          callback({
            token,
            logOut: () => {
              storage.clear();
              firebase.auth().signOut();
            }
          });
        });
    } else {
      callback(null);
    }
  });
}

export default function ConfiguredApp() {
  const [session, setSession] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const client = useApolloClient();

  firebase = initializeFirebase({
    config: {
      apiKey: "AIzaSyDbPR1cFfplX8xbKZ46TqUv6AFiB_8eivc",
      authDomain: "sabre-spot-the-dot.firebaseapp.com",
      databaseURL: "https://sabre-spot-the-dot-default-rtdb.firebaseio.com",
      projectId: "sabre-spot-the-dot",
      storageBucket: "sabre-spot-the-dot.appspot.com",
      messagingSenderId: "205994041605",
      appId: "1:205994041605:web:351f22746a1aed31eb976c"
    }
  });

  initializeStorage(localStorage);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(userInfo => {
      if (!userInfo) {
        setSession(null);
        setIsInitialized(true);
        return false;
      }
      return client
        .query({
          query: GET_SESSION
        })
        .then(response => {
          const sessionInfo = get(response, "data.getSession");
          const privileges = keyBy(sessionInfo.privileges, "id");
          setSession({ ...sessionInfo, ...userInfo, privileges });
          setIsInitialized(true);
        });
    });
    return () => {
      return unsubscribe && unsubscribe();
    };
  }, [client]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SessionContext.Provider value={session}>
        {!isInitialized ? <PageLoader center /> : <Router />}
      </SessionContext.Provider>
    </ErrorBoundary>
  );
}
