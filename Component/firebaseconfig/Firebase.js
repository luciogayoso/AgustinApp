import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDh4-6MsjO9bGOUBq-O0eXaVuUIjij8-Gs",
    authDomain: "agustin-app-a689b.firebaseapp.com",
    projectId: "agustin-app-a689b",
    storageBucket: "agustin-app-a689b.appspot.com",
    messagingSenderId: "619476183667",
    appId: "1:619476183667:web:048a27a80ec80bc6ab9806"
  };


  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;