import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebaseConfig";

export const auth = getAuth(app)

const registerUser = async (data) => {
    const {role, firstName, lastName ,email,password} = data;
    try {
        
        const resp = createUserWithEmailAndPassword(auth, email, password)
        let user = resp.user
        return user
    } catch (error) {
        return {
           code: error.code,
           massage: error.message
        }
        
    } 
  
}
const loginUser = async () => {

}
const logOutUser = async () => {

}

export {registerUser, logOutUser, loginUser }