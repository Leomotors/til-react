// * From Google
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "food-waste-quotes.firebaseapp.com",
  projectId: "food-waste-quotes",
  storageBucket: "food-waste-quotes.appspot.com",
  messagingSenderId: "670078744840",
  appId: "1:670078744840:web:a6e182ba8c33ed5ff794bd",
  measurementId: "G-C2BMXF8P5X",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
