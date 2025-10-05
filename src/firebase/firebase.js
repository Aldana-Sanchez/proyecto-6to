import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5p_LkkKRDmVxHnjJEBKfH809yTZmfkoE",
  authDomain: "proyecto6to-faecb.firebaseapp.com",
  projectId: "proyecto6to-faecb",
  storageBucket: "proyecto6to-faecb.firebasestorage.app",
  messagingSenderId: "967414430580",
  appId: "1:967414430580:web:90085bf27cb2dce33bca21",
  measurementId: "G-1TT48435SN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

