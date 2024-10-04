// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmrUGrfHGZB3eNVBxFsphTyLDNEjvZtw8",
  authDomain: "mychoice-5eae5.firebaseapp.com",
  projectId: "mychoice-5eae5",
  storageBucket: "mychoice-5eae5.appspot.com",
  messagingSenderId: "816960927886",
  appId: "1:816960927886:web:6b36d26d51546fbdcab1df",
  measurementId: "G-JSQXDJJCJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;