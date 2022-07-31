import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAzRC9iKjf7THwiVnsEleujyGErp4gQwUk",
    authDomain: "work-diary-d1e6a.firebaseapp.com",
    databaseURL: "https://work-diary-d1e6a.firebaseio.com",
    projectId: "work-diary-d1e6a",
    storageBucket: "work-diary-d1e6a.appspot.com",
    messagingSenderId: "667502036281",
    appId: "1:667502036281:web:cb305674b7eecc92c454e8"
  };

console.log("FIREBASE called");

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
