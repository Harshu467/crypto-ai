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

export const getUserData = async (uid) => {
  try {
    if (uid.length > 0) {
      let data;
      const userRef = await query(
        collection(db, "users"),
        where("uid", "==", uid)
      );
      const userSnapshot = await getDocs(userRef);
      userSnapshot.forEach((doc) => {
        data = doc.data();
      });
      return {success:true,data:data};
    }
  } catch (error) {
    console.error("Error getting user data: ", error);
    return  {success: false, error: error};
  }
};

export const addTransaction = async (uid, coinData,currency) => {
  try {
    //console.log("coinData",coinData);
    const transactionRef = await collection(db, "transactions");
    const transactionDoc = await transactionRef.get(uid);
    if(transactionDoc){
      
    } else {
      await setDoc(doc(transactionRef, uid), {
        
      });
    }
  } catch (error) {
    console.error("Error adding transaction: ", error); 
  }
};