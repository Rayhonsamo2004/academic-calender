import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMRfFMywu5D2rzMAnqtAlA2y_6LQ4shFA",
  authDomain: "it-academic-calendar.firebaseapp.com",
  databaseURL: "https://it-academic-calendar-default-rtdb.firebaseio.com",
  projectId: "it-academic-calendar",
  storageBucket: "it-academic-calendar.appspot.com",
  messagingSenderId: "376304498000",
  appId: "1:376304498000:web:6030ed8bc9131742ce6855",
  measurementId: "G-CX9JBSYQX6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage
const auth=getAuth(app);

console.log("Firebase app initialized:", app);

export { db, storage,auth };
