import { db } from '../../firebase';
import { doc, getDoc, setDoc, addDoc, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const getPlots = async (id) => {
    const docRef = doc(db, "plotData", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("data found");
        return docSnap.data();
    } else {
        console.log("no data found");
    }
}

export const savePlotData = async (formData) => {
    const docRef = await addDoc(collection(db, "plotData"), formData);
    console.log("document added. doc = ", docRef);
    return docRef.id;
}
