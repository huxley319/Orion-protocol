import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBussMcv5HjUXI_J2Ht1Cu2xzY5SGlwbwM",
  authDomain: "telegram-mini-app-ba9b7.firebaseapp.com",
  databaseURL: "https://telegram-mini-app-ba9b7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "telegram-mini-app-ba9b7",
  storageBucket: "telegram-mini-app-ba9b7.appspot.com",
  messagingSenderId: "334435957090",
  appId: "1:334435957090:web:4e3d1857c9113c1592d43b",
  measurementId: "G-WZ8JNQXS7F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export  {db};
