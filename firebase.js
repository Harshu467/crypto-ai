// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9AtJn-FLJ7zX9zNv3z1ow1KRuso6hG-w",
  authDomain: "crypto-stock-97d36.firebaseapp.com",
  projectId: "crypto-stock-97d36",
  storageBucket: "crypto-stock-97d36.appspot.com",
  messagingSenderId: "999438208553",
  appId: "1:999438208553:web:2de1346099f2a9c029d638",
  measurementId: "G-3QG0LVP0DK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig,'app');
export const auth = getAuth(app);
export const db = getFirestore(app);