// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC3_UEC2aHgcHbI8s-Qvj6jbQCubswNbQ",
  authDomain: "business-directory-4120d.firebaseapp.com",
  projectId: "business-directory-4120d",
  storageBucket: "business-directory-4120d.appspot.com",
  messagingSenderId: "734026560346",
  appId: "1:734026560346:web:70f2a5df218fa1f3d33963",
  measurementId: "G-XT8HKTY75S",
  databaseURL: "https://business-directory-4120d-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
