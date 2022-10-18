import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYQOF69u8VTvupNa-l2UesewkkyuvqR9E",
  authDomain: "trowel-tech.firebaseapp.com",
  projectId: "trowel-tech",
  storageBucket: "trowel-tech.appspot.com",
  messagingSenderId: "632137711644",
  appId: "1:632137711644:web:674af185037af27e0d9fd9",
  measurementId: "G-CP4V4S8WBP"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
