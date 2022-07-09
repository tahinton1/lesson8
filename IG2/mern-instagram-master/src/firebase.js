import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBZdlDmY0AtPbFfSgFaDSi3WzusWfJGoJM",
  authDomain: "instagramclone-18052.firebaseapp.com",
  projectId: "instagramclone-18052",
  storageBucket: "instagramclone-18052.appspot.com",
  messagingSenderId: "727162601524",
  appId: "1:727162601524:web:d6dfeb8175d6efd4f58a61"
  /*apiKey: "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA",
  authDomain: "instagram-clone-23884.firebaseapp.com",
  databaseURL: "https://instagram-clone-23884.firebaseio.com",
  projectId: "instagram-clone-23884",
  storageBucket: "instagram-clone-23884.appspot.com",
  messagingSenderId: "671034896143",
  appId: "1:671034896143:web:3aceafdf2319c9f1fc587a",*/
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
