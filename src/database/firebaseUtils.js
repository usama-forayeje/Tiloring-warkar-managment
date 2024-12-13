import { getDatabase, ref, onValue } from "firebase/database";
import app from "./firebaseConfig";

const db = getDatabase(app);

export const getFirebaseData = async () => {
  const starCountRef = ref(db, "newWorks");

  return new Promise((resolve, reject) => {
    try {
      onValue(starCountRef, (snapshot) => {
        const updateNewWorkList = [];
        snapshot.forEach(item => {
            updateNewWorkList.push({
                id: item.key,
                ...item.val()
            })
        })
        resolve(updateNewWorkList);
      });
    } catch (error) {
      reject(error);
    }
  });
};
