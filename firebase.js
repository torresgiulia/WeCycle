import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj8gsWWod2A2KgGmp2K0uNTJSG6vN__FU",
  authDomain: "wecycle-db.firebaseapp.com",
  projectId: "wecycle-db",
  storageBucket: "wecycle-db.appspot.com",
  messagingSenderId: "894634254010",
  appId: "1:894634254010:web:3d9af876b429e158e9ac83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
