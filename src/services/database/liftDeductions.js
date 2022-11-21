import { db } from '../../firebase';
import { addDoc, collection, doc, getDocs, deleteDoc } from 'firebase/firestore';

export const addDeduction = (data) => {
    const ref = collection(db, "plotData", data.plotId, "deductions");
    return addDoc(ref, data);
}

export const getDeductions = async (plotId) => {
    const querySnapshot = await getDocs(collection(db, "plotData", plotId, "deductions"));
    const data = [];

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
    }

    return data;
}

export const deleteDeduction = ({deductionId, plotId}) => {
    
    const ref = doc(db, "plotData", plotId, "deductions", deductionId);

    return deleteDoc(ref);
}