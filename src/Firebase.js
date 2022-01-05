import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBWlsz2FXAG8WLLVuIsPAGsg27FUYi49Ag",
  authDomain: "auth-development-7c4a9.firebaseapp.com",
  projectId: "auth-development-7c4a9",
  storageBucket: "auth-development-7c4a9.appspot.com",
  messagingSenderId: "124533874516",
  appId: "1:124533874516:web:d7ac24c11f73bf344a72c1",
});

const firestore = app.firestore();
export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage=app.storage()
export const auth = app.auth();
export default app;
