import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5KF9wig31JkxjXn0x-Wj9tHoJF4JoWyw",
  authDomain: "m-recepty.firebaseapp.com",
  projectId: "m-recepty",
  storageBucket: "m-recepty.appspot.com",
  messagingSenderId: "351383567286",
  appId: "1:351383567286:web:881e678a386bbc3effdf17",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
