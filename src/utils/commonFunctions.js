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
      return { success: true, data: data };
    }
  } catch (error) {
    console.error("Error getting user data: ", error);
    return { success: false, error: error };
  }
};
export const addTransactions = async (uid, coinData) => {
  try {
    const transactionDocRef = doc(db, "transactions", uid);
    const timestamp = serverTimestamp(); // Get server timestamp

    // console.log("Adding new transaction...");

    // Create a new document if it doesn't exist
    if (!(await transactionExists(uid))) {
      await setDoc(transactionDocRef, {});
    }

    // Add each coin as a new document in a subcollection
    const coinsCollectionRef = collection(transactionDocRef, "coins");
    coinData.forEach(async (coin) => {
      const newCoinData = {
        name: coin.name,
        symbol: coin.symbol,
        current_price: coin.current_price,
        image: coin.image,
        current_currency: coin.current_currency,
        quantity: coin.quantity,
        timestamp: timestamp, // Add timestamp to each coin's data
      };
      await addDoc(coinsCollectionRef, newCoinData);
    });

    // console.log("Transaction added successfully!");
    return { success: true, response: "Transaction added successfully!" };
  } catch (error) {
    console.error("Error adding transaction: ", error);
    return { success: false, error: error };
  }
};

// Function to check if transaction document exists
const transactionExists = async (uid) => {
  const transactionDocRef = doc(db, "transactions", uid);
  const snapshot = await getDoc(transactionDocRef);
  return snapshot.exists();
};
export const getTransactions = async (uid) => {
  try {
    if(uid===undefined){  
      return { success: false, error: "No user ID provided" };
    }
    // console.log("Getting transactions...");
    const coinsData = [];
    // console.log("uid: ", uid);
    // console.log("coinsData: ", coinsData)
    const transactionDocRef = collection(db, "transactions", uid, "coins");
    if(transactionDocRef===undefined){
      return { success: false, error: "No transaction data found" };
    }
    // console.log("transactionDocRef: ", transactionDocRef);
    const snapshot = await getDocs(transactionDocRef);
    // console.log("snapshot: ", snapshot);
    snapshot.forEach((doc) => {
      coinsData.push(doc.data());
    });
    // console.log("Transactions retrieved successfully!");
    return { success: true, data: coinsData };
  } catch (error) {
    console.error("Error getting transactions: ", error);
    return { success: false, error: error };
  }
};
