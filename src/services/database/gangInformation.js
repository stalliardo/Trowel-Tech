import { db } from '../../firebase';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';

export const createNewGang = async(formData) => {
    const { firstName, lastName, memberType, dayRate, skill} = formData;

    console.log("createNewGang Called and formData = ", formData);

    const docRef = await addDoc(collection(db, "gangInformation"), formData);
    console.log("new doc = ", docRef);
    console.log("Documnet added with auto generated id: ", docRef.id);
}