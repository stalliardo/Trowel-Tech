import { db } from '../../firebase';
import { doc, getDoc, setDoc, addDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const getPlot = async (id) => {
    const docRef = doc(db, "plotData", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("data found");
        return docSnap.data();
    } else {
        console.log("no data found");
    }
}

export const getAllPlots = async (id) => {
    const plotsRef = collection(db, "plotData");
    const q = await query(plotsRef, where("gangId", "==", id));

   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
    console.log("doc.id = ", doc.data());
   });

   return querySnapshot;
    
}

export const savePlotData = async (formData) => {
    const docRef = await addDoc(collection(db, "plotData"), formData);
    console.log("document added. doc = ", docRef);
    return docRef.id;
}
