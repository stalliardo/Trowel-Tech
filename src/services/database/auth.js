import { db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

export const signUpUserWithEmailAndPassword = async (formData) => {
    const { firstName, lastName, email, password } = formData;
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", credential.user.uid), {
        name: firstName + " " + lastName,
    });

    return credential;
}

export const signInUserWithEmailAndPassword = (email, password) => {
    // TODO
}

export const getUserDoc = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        console.log("documnet data = ", docSnap.data());
        return docSnap.data();
    } else {
        console.log("Could not find doc");
    }
}