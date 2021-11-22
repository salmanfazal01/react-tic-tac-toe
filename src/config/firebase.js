// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAbSgze84GGEpg5YDT933qKeBjMdfdREI",
  authDomain: "react-tic-tac-toe-57520.firebaseapp.com",
  projectId: "react-tic-tac-toe-57520",
  storageBucket: "react-tic-tac-toe-57520.appspot.com",
  messagingSenderId: "756405170837",
  appId: "1:756405170837:web:d7821406420686ea7e219c",
  measurementId: "G-MKH0D5LB9Q",
};

// Initialize Firebase
let firebaseApp = null;
try {
  firebaseApp = initializeApp(firebaseConfig);
} catch (error) {
  console.error({ error });
}

// Initialize analytics
let analytics = null;
export const useAnalytics = () => {
  if (!analytics) {
    analytics = getAnalytics();
  }
  return analytics;
};

// Initialize firestore
let firestore = null;
export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore();
  }
  return firestore;
};
