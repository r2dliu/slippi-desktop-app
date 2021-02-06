import "typeface-roboto/index.css";
import "./styles/styles.scss";

import log from "electron-log";
import { hot } from "react-hot-loader/root";
import firebase from "firebase";
import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { HomeView } from "./views/HomeView";
import { LoadingView } from "./views/LoadingView";
import { MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { slippiTheme } from "./styles/theme";
import { LandingView } from "./views/LandingView";
import { NotFoundView } from "./views/NotFoundView";
import { SettingsView } from "./views/SettingsView";

import { useApp } from "@/store/app";
import { useSettings } from "@/store/settings";
import { initializeFirebase } from "./lib/firebase";
import Snackbar from "@material-ui/core/Snackbar";
import { ipcRenderer } from "electron-better-ipc";

const App: React.FC = () => {
  const initialized = useApp((state) => state.initialized);
  const snackbarOpen = useApp((state) => state.snackbarOpen);
  const snackbarContent = useApp((state) => state.snackbarContent);
  const dismissSnackbar = useApp((state) => state.dismissSnackbar);
  const init = useApp((state) => state.initialize);
  const setUser = useApp((state) => state.setUser);

  React.useEffect(() => {
    // Initialize the Firebase app if we haven't already
    try {
      initializeFirebase();
    } catch (err) {
      log.error(
        "Error initializing firebase. Did you forget to create a .env file from the .env.example file?"
      );
      init();
      return;
    }

    // Subscribe to user auth changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // Set the user
      setUser(user);

      // Initialize the rest of the app
      init();
    });

    // Unsubscribe on unmount
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    // Notify main to start processing replays
    const rootSlpPath =
      useSettings((store) => store.settings.rootSlpPath) || undefined;
    ipcRenderer.callMain("process_replays", rootSlpPath);
    console.log(rootSlpPath);
  }, []);

  if (!initialized) {
    return <LoadingView />;
  }

  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomeView} />
        <Route path="/landing" component={LandingView} />
        <Route path="/settings" component={SettingsView} />
        <Redirect exact from="/" to="/landing" />
        <Route component={NotFoundView} />
      </Switch>
      <Snackbar open={snackbarOpen} onClose={dismissSnackbar}>
        {snackbarContent}
      </Snackbar>
    </Router>
  );
};

// Providers need to be initialized before the rest of the app can use them
const AppWithProviders: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={slippiTheme}>
        <App />
      </MuiThemeProvider>
    </StylesProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default hot(AppWithProviders);
