import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // apiKey: "AIzaSyAzRC9iKjf7THwiVnsEleujyGErp4gQwUk",
  // authDomain: "work-diary-d1e6a.firebaseapp.com",
  // databaseURL: "https://work-diary-d1e6a.firebaseio.com",
  // projectId: "work-diary-d1e6a",
  // storageBucket: "work-diary-d1e6a.appspot.com",
  // messagingSenderId: "667502036281",
  // appId: "1:667502036281:web:cb305674b7eecc92c454e8"


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
