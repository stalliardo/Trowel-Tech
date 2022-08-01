import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

// onAuthStateChanged(auth, (user) => {
//     if(user){
//         console.log('User called from authStateChanged function');
//     } else {
//         // user is signed out
//     }
// })

export const signUpUserWithEmailAndPassword = async (formData) => {
    // TODO - validations in the form component
    const { firstName, lastName, email, password } = formData;



    const credential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", credential.user.uid), {
        name: firstName + " " + lastName,
    });

    return credential;

}

export const signInUserWithEmailAndPassword = (email, password) => {

}