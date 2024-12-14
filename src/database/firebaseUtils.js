import { getDatabase, ref, onValue, set } from "firebase/database";
import app from "./firebaseConfig";

const db = getDatabase(app);


export const getFirebaseData = async (tableName) => {
  const starCountRef = ref(db, tableName);

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


export const setFirebaseData = () => {
      // Save data to Firebase
      set(ref(db, `newWorks/`))
}
