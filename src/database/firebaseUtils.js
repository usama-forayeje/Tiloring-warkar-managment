import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import app from "./firebaseConfig";

const db = getDatabase(app);

export const getFirebaseData = async (tableName) => {
  const starCountRef = ref(db, tableName);

  return new Promise((resolve, reject) => {
    try {
      onValue(starCountRef, (snapshot) => {
        const updateNewWorkList = [];
        snapshot.forEach((item) => {
          updateNewWorkList.push({
            id: item.key,
            ...item.val(),
          });
        });
        resolve(updateNewWorkList);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getUpdateDataOnEdit = async (tableName) => {
  const starCountRef = ref(db, tableName);

  return new Promise((resolve, reject) => {
    try {
      onValue(starCountRef, (snapshot) => {
        resolve(snapshot.val());
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const setFirebaseData = async (tableName, data) => {
  // Save data to Firebase
  set(ref(db, tableName), data);
};


// Remove data from firebase 
export const removeFirebaseData = async (tableName) => {
  try {
    await remove(ref(db, tableName)); 
  } catch (error) {
    console.error("Error while deleting data:", error);
  }
};