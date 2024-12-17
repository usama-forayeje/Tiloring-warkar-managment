import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebaseConfig";

export const auth = getAuth(app);

const registerUser = async (data) => {
  const { role, firstName, lastName, email, password } = data;
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    let user = resp.user;
    console.log(user);
    return {
        id: user.uid,
        firstName,lastName,
        role
    };
    
  } catch (error) {
    return {
      error: true,
      code: error.code,
      massage: error.message,
    };
  }
};
const loginUser = async ({ email, password }) => {
    try {
       let resp = await signInWithEmailAndPassword(auth,email, password)
       const user = resp.user
       return {
        id:user.uid,
        email:user.email
      };
    } catch (error) {
        return {
            error: true,
            code: error.code,
            message: error.message,
          };
    }

};


const logOutUser = async () => {};

export { registerUser, logOutUser, loginUser };
