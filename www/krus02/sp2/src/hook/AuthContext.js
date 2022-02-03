import { useEffect, useState, createContext, useContext } from "react";
import { gapi } from "gapi-script";

const authContext = createContext({
  auth: null,
  user: null,
  gapiInstance: null,
  ready: false,
});

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [ready, setReady] = useState(false);
  const [gapiInstance, setGapiInstace] = useState(gapi);

  const init = async () => {
    gapiInstance.client
      .init({
        apiKey: "AIzaSyCClDbFfRRELg4noQWA93etWkaOv_QTFlU",
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope:
          "profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
      })
      .then(() => {
        setReady(true);
        setGapiInstace(gapi);
      });
  };

  useEffect(() => {
    gapiInstance.load("client:auth2", init);
  }, [gapiInstance]);

  useEffect(() => {
    if (ready) setAuth(gapiInstance.auth2.getAuthInstance());
  }, [ready, gapiInstance]);

  useEffect(() => {
    if (auth !== null) {
      if (auth.isSignedIn.get()) {
        updateUser(auth.currentUser.get());
      }
    }
  }, [auth]);

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      console.log("User signed out.");
    });
  };

  const signIn = () => {
    auth.signIn().then(() => {
      if (auth.isSignedIn.get()) {
        updateUser(auth.currentUser.get());
      }
    });
  };

  const updateUser = (currentUser) => {
    const name = currentUser.getBasicProfile().getName();
    const email = currentUser.getBasicProfile().getEmail();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    console.log(profileImg);
    setUser({
      name,
      profileImg,
      email,
    });
  };

  return {
    user,
    auth,
    ready,
    gapiInstance,
    signOut,
    signIn,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
