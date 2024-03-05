
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);