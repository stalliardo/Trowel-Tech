import { db } from '../../firebase';
import { doc, getDoc, deleteDoc, addDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

export const getOnePlot = async (id) => {
    const docRef = doc(db, "plotData", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("no data found");
    }
}

export const getAllPlots = async (id) => {
    const plotsRef = collection(db, "plotData");
    const q = await query(plotsRef, where("gangId", "==", id));
    const querySnapshot = await getDocs(q);
    const dataWithIds = [];

    if (!querySnapshot.empty) {
        querySnapshot.forEach((snapshot) => {
            dataWithIds.push({ ...snapshot.data(), id: snapshot.id });
        })
    }

    return dataWithIds.length ? dataWithIds : [];

}

export const savePlotData = async (formData) => {
    const docRef = await addDoc(collection(db, "plotData"), formData);
    console.log("document added. doc = ", docRef);
    return docRef.id;
}

export const editPlot = async(data) => {
    const docRef = doc(db, "plotData", data.id);
    await updateDoc(docRef, data)
}

export const deletePlot = async(id) => {
    const docRef = doc(db, "plotData", id);
    await deleteDoc(docRef, id);
}