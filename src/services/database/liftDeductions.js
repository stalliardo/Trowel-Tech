import { db } from '../../firebase';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';

export const addDeduction = (data) => {
    // Subcollection -> plotData/id/deductions/doc
    const ref = collection(db, "plotData", data.plotId, "deductions");
    return addDoc(ref, data);
}

export const getDeductions = async (plotId) => {
    const querySnapshot = await getDocs(collection(db, "plotData", "KlhdEZ4D4dN0cl6yLGFY", "deductions"));
    const data = [];

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
    }

    return data;
}