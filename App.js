import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { StyleSheet } from "react-native";
import configureStore from "./store/store";
import ScreenStack from "./Component/ScreenStack";
import { firebase as fbConfig, rrfConfig } from "./fbConfig";

const initialState = window && window.__INITIAL_STATE__; // set initial state here
const store = configureStore(initialState);

// Initialize Firebase instance
firebase.initializeApp(fbConfig);

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rrfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <NavigationContainer>
          <ScreenStack />
        </NavigationContainer>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
