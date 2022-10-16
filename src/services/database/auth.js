import { db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth();

export const signUpUserWithEmailAndPassword = async (formData) => {
    const { firstName, lastName, email, password } = formData;
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", credential.user.uid), {
        name: firstName + " " + lastName,
    });

    return credential;
}

export const signInUserWithEmailAndPassword = async (formData) => {
    const { email, password } = formData;
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential;
}

export const getUserDoc = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        console.log("docsnap = ", docSnap.data());
        return {...docSnap.data(), id: userId};
    } else {
    }
}

export const logUserOut = () => {
    return signOut(auth);
}