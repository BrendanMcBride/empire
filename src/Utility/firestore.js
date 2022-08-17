import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLz9Mn9tUP05qhlNMW7QUVDljwiNR40EA",
  authDomain: "react-empire.firebaseapp.com",
  projectId: "react-empire",
  storageBucket: "react-empire.appspot.com",
  messagingSenderId: "169210616243",
  appId: "1:169210616243:web:b8891fb8b2ccbdb92cd3c6",
  measurementId: "G-Y5QY2LCHQ1",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };
