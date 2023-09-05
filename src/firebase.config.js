import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCjUVC1SY36wDssJifKKLcvqb4BE6B0afg",
  authDomain: "abdullahmart-94047.firebaseapp.com",
  projectId: "abdullahmart-94047",
  storageBucket: "abdullahmart-94047.appspot.com",
  messagingSenderId: "455668433359",
  appId: "1:455668433359:web:bdc6a403590c3418ff12ba",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
