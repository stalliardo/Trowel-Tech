import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

// onAuthStateChanged(auth, (user) => {
//     if(user){
//         console.log('User called from authStateChanged function');
//     } else {
//         // user is signed out
//     }
// })

export const signUpUserWithEmailAndPassword = (email, password) => {
    // TODO - validations in the form component

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in...
        const user = userCredential.user;
    }).catch((error) => {
        return 
    })
    
}

export const signInUserWithEmailAndPassword = (email, password) => {

}