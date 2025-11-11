import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5p_LkkKRDmVxHnjJEBKfH809yTZmfkoE",
  authDomain: "proyecto6to-faecb.firebaseapp.com",
  projectId: "proyecto6to-faecb",
  storageBucket: "proyecto6to-faecb.firebasestorage.app",
  messagingSenderId: "1:967414430580:web:90085bf27cb2dce33bca21",
  appId: "G-1TT48435SN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

