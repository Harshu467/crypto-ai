'use client';
import { useContext } from "react";
import { app, db } from "../../firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
  setDoc,
  doc,
  exists,
  arrayUnion,
  deleteDoc,
  increment,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { UserContext } from "@/context/UserContext";

//Create a function which add data to firestore users collection and uid create in realtime database

export const addToFirebaseUsers = async (uid, email, name) => {
  try {
    const userRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      uid: uid,
    });
  } catch (error) {
    console.error("Error adding user: ", error);
    return error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const usersRef = await query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const usersSnapshot = await getDocs(usersRef);
    if (usersSnapshot.empty) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error checking email: ", error);
  }
};

