import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
//import "firebase/functions";
//import { createFirestoreInstance } from "redux-firestore";
import { createStore, combineReducers, compose } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { StyleSheet } from "react-native";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
//import configureStore from "./Component/firebaseconfig/store";
import ScreenStack from "./Component/ScreenStack";
//import {
//  firebase as fbConfig,
//  rrfConfig,
//} from "./Component/firebaseconfig/Firebase";

//const initialState = window && window.__INITIAL_STATE__; // set initial state here
//const store = configureStore(initialState);

// Initialize Firebase instance
//firebase.initializeApp(fbConfig);

const firebaseConfig = {
  apiKey: "AIzaSyDh4-6MsjO9bGOUBq-O0eXaVuUIjij8-Gs",
  authDomain: "agustin-app-a689b.firebaseapp.com",
  projectId: "agustin-app-a689b",
  storageBucket: "agustin-app-a689b.appspot.com",
  messagingSenderId: "619476183667",
  appId: "1:619476183667:web:048a27a80ec80bc6ab9806",
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
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
